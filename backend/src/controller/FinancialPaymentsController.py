from src.config.FirebaseService import FirebaseService
from src.model.FinancialPaymentsModel import FinancialPaymentsModel

class FinancialPaymentsController(FinancialPaymentsModel):
    def __init__(self, idUser: str, type_account: str, meta: float):
        super().__init__(idUser, type_account, meta)
        self.firebase_service = FirebaseService()
        
        
    def get_all_payments(self, idUser: str) -> list:
        document = self.firebase_service.get_document('financialPayments', idUser)
        return document.val()


    def create_payment_accounts(self) -> None:
        document = self.firebase_service.get_document('financialPayments', self.idUser)
        
        if document.val() is not None:
            if self.type_account in document.val():
                raise Exception("Account already exists")
        
            update_data = {self.type_account: self.to_dict()[self.type_account]}
            self.firebase_service.update_document('financialPayments', self.idUser, update_data)
            return
            
        self.firebase_service.add_document('financialPayments', self.idUser, self.to_dict())
        
        
    def rename_type_account(self, new_type_account: str) -> None:
        document = self.firebase_service.get_document('financialPayments', self.idUser)
        old_data = document.val().get(self.type_account, {})
        
        if not old_data:
            raise Exception("Old account type not found")
        
        if new_type_account in document.val():
            raise Exception(f"Account type {new_type_account} already exists")
        
        update_data: dict = {
                f"{new_type_account}": old_data,
            }
            
        self.firebase_service.update_document('financialPayments', self.idUser, update_data)
        self.firebase_service.remove_item_in_document('financialPayments', self.idUser, self.type_account)
        
    
    def update_meta_type_account(self) -> None:
        document = self.firebase_service.get_document('financialPayments', self.idUser)
        old_data = document.val().get(self.type_account, {})
        
        if not old_data:
            raise Exception("Old account type not found")
        
        update_data: dict = {
                f"{self.type_account}": {
                    "accounts": old_data["accounts"],
                    "meta": self.meta
                }
            }
            
        self.firebase_service.update_document('financialPayments', self.idUser, update_data)
        
        
    def delete_type_account(self) -> None:
        update_data: dict = {
            f"{self.type_account}": {}
        }
        
        self.firebase_service.update_document('financialPayments', self.idUser, update_data)
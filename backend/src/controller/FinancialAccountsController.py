from src.config.FirebaseService import FirebaseService
from src.model.FinancialAccountsModel import FinancialAccountsModel

class FinancialAccountsController(FinancialAccountsModel):
    def __init__(self, idUser: str, name_account: str, data_account: dict) -> None:
        super().__init__(idUser, name_account, data_account)
        self.firebase_service = FirebaseService()
        
    
    def add_account(self, type_account: str) -> None:
        document = self.firebase_service.get_document('financialPayments', self.idUser)
        
        accounts_data = document.val() or {}
        
        if type_account not in accounts_data:
            raise Exception(f"Account type '{type_account}' not found")
        
        if 'accounts' not in accounts_data[type_account]:
            accounts_data[type_account]['accounts'] = {}
        
        if self.name_account in accounts_data[type_account]['accounts']:
            raise Exception(f"Account '{self.name_account}' already exists in '{type_account}'")
            
        accounts_data[type_account]['accounts'][self.name_account] = self.to_dict()
        
        self.firebase_service.add_document('financialPayments', self.idUser, accounts_data)
    
    
    def update_account(self, type_account: str) -> None:
        document = self.firebase_service.get_document('financialPayments', self.idUser)
        
        accounts_data = document.val()
        
        if type_account not in accounts_data:
            raise Exception(f"Account type '{type_account}' not found")
        
        if self.name_account not in accounts_data[type_account]['accounts']:
            raise Exception(f"Account '{self.name_account}' not found in '{type_account}'")
        
        accounts_data[type_account]['accounts'][self.name_account] = self.to_dict()
        
        self.firebase_service.update_document('financialPayments', self.idUser, accounts_data)
    
    
    def delete_account(self, type_account: str) -> None:
        document = self.firebase_service.get_document('financialPayments', self.idUser)
        
        accounts_data = document.val()
        
        if type_account not in accounts_data:
            raise Exception(f"Account type '{type_account}' not found")
        
        if self.name_account not in accounts_data[type_account]['accounts']:
            raise Exception(f"Account '{self.name_account}' not found in '{type_account}'")
        
        del accounts_data[type_account]['accounts'][self.name_account]
        
        self.firebase_service.update_document('financialPayments', self.idUser, accounts_data)
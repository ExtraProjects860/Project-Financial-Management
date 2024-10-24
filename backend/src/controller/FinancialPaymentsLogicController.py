from src.config.FirebaseService import FirebaseService
from src.controller.FinancialPaymentsController import FinancialPaymentsController
from datetime import datetime

class FinancialPaymentsLogicController(FinancialPaymentsController):
    
    def __init__(self):
        self.firebase_service = FirebaseService()
        
    
    def sum_total_type_account_payments(self, idUser: str) -> dict[str, float]:
        data: dict = self.get_all_payments(idUser)
        
        aux_dict: dict[str, float] = {}
        
        for type_account, type_data in data.items():
            total: float = 0.0
            
            if not type_data.get('accounts'):
                aux_dict[type_account] = 0.0
                continue

            for account_data in type_data['accounts'].values():
                total += account_data.get('price', 0.0)
            
            aux_dict[type_account] = total
        
        print(aux_dict)
        return aux_dict
    
    
    def sum_total_balance(self, idUser: str) -> float:
        document = self.firebase_service.get_document('users', idUser)
        monthly_income: float = document.val().get('monthlyIncome', 0.0)
        
        dict_total_per_type: dict[str, float] = self.sum_total_type_account_payments(idUser)
        return monthly_income - sum(dict_total_per_type.values())
    
    
    def verify_type_account_not_pay(self, idUser: str) -> dict[str, list[str]]:
        data: dict = self.get_all_payments(idUser)
        
        aux_dict: dict[str, list[str]] = {}
        
        for type_account, type_data in data.items():
            aux_list: list[str] = []
            
            if not type_data.get('accounts'):
                continue

            for account_name, account_data in type_data['accounts'].items():
                if account_data["status"] == "Não Pago":
                    aux_list.append(account_name)
                    
            aux_dict[type_account] = aux_list
            
        return aux_dict
    
    
    def verify_accounts_payment_date(self, idUser: str) -> dict[str, list[str]]:
        data: dict = self.get_all_payments(idUser)
        
        aux_dict: dict[str, list[str]] = {}
        
        for type_account, type_data in data.items():
            aux_list: list[str] = []
            
            if not type_data.get('accounts'):
                continue

            for account_name, account_data in type_data['accounts'].items():
                data_obj: datetime = datetime.strptime(
                    account_data["paymentDate"], "%Y-%m-%d")
                
                data_convert: str = data_obj.strftime("%d/%m/%Y")
                
                if data_obj.date() == datetime.now().date() :
                    aux_list.append({"accountName": account_name, "paymentDate": data_convert})
                    
            aux_dict[type_account] = aux_list
            
        return aux_dict
    
    
    def all_payments_per_type_account(self, idUser: str) -> dict[str, list[dict[str, float]]]:
        data: dict = self.get_all_payments(idUser)
        
        aux_dict: dict[str, list[dict[str, float]]] = {}
        
        for type_account, type_data in data.items():
            aux_list: list[dict[str, float]] = []
                
            if not type_data.get('accounts'):
                continue
                
            for account_name, account_data in type_data['accounts'].items():
                price: float = account_data.get('price', 0.0)
                aux_list.append({account_name: price})
                
            aux_list.sort(key=lambda x: list(x.values())[0], reverse=True)
                
            aux_dict[type_account] = aux_list
        
        return aux_dict
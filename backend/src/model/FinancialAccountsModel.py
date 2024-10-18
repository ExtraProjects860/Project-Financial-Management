
class FinancialAccountsModel:
    
    def __init__(self, idUser: str, name_account: str, data_account: dict = None):
        self.idUser: str = idUser
        self.name_account: str = name_account
        self.data_account: dict = data_account
        
    def to_dict(self) -> dict:
        return {
            "description": self.data_account["description"],
            "status": self.data_account["status"],
            "priority": self.data_account["priority"],
            "paymentDate": self.data_account["paymentDate"],
            "price": self.data_account["price"]
        }
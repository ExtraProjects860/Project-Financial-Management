
class FinancialPaymentsModel:
    
    def __init__(self, idUser: str, type_account: str = None, meta: float = None) -> None:
        self.idUser: str = idUser
        self.type_account: str = type_account
        self.meta: float = meta
    
    def to_dict(self) -> dict:
        return {
           f"{self.type_account}": {
                'meta': self.meta,
            }
        }
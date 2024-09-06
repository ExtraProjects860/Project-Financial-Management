from datetime import datetime

class UserModel:
    
    def __init__(self, email: str = None, password: str = None, name: str = None, profession: str = None, monthlyIncome: float = None):
        self.email: str = email
        self.password: str = password
        self.name: str = name
        self.profession: str = profession
        self.monthlyIncome: float = monthlyIncome
        self.currentAt: str = datetime.now().isoformat()
        
    
    def to_dict_create(self) -> dict:
        return {
            'email': self.email,
            'name': self.name,
            'profession': self.profession,
            'monthlyIncome': self.monthlyIncome,
            'createdAt': self.currentAt
        }

    
    def to_dict(self) -> dict:
        return {
            'email': self.email,
            'name': self.name,
            'profession': self.profession,
            'monthlyIncome': self.monthlyIncome,
        }
        
    
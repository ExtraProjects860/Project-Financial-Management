from src.config.FirebaseService import FirebaseService
from src.model.UserModel import UserModel
from flask import session, jsonify
from functools import wraps
from dotenv import load_dotenv

class UserController(UserModel):
    def __init__(self, email: str, password: str, name: str, profession: str, monthlyIncome: float):
        load_dotenv()
        super().__init__(email, password, name, profession, monthlyIncome)
        self.firebase_service = FirebaseService()
        
    @staticmethod
    def login_required(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if 'token' not in session:
                return jsonify({"message": "Unauthorized, please login"}), 401
            return f(*args, **kwargs)
        return decorated_function
    
    
    def get_information_user(self, uid: str) -> dict:
        return self.firebase_service.get_auth().get_account_info(uid)
    
    
    def create_user(self) -> None:
        if not self.email or not self.password:
            raise Exception('Email and password are required')
        
        try:
            print(f"Creating user with email: {self.email}")
            user = self.firebase_service.get_auth().create_user_with_email_and_password(
                email=self.email,
                password=self.password,
            )
            
            self.firebase_service.add_document('users', user['localId'], self.to_dict_create())
            
            if not user and user['localId']:
                raise RuntimeError("User creation failed, no user ID available")
            
            self.firebase_service.get_auth().send_email_verification(user["idToken"])
        except Exception as e:
            raise Exception(str(e))
                
    
    def login_user(self) -> tuple[str, dict[str, str | int]]:
        user = self.firebase_service.get_auth().sign_in_with_email_and_password(
            email=self.email,
            password=self.password
        )
        
        payload_data_user: dict = self.firebase_service.get_document('users', user['localId']).val()
        
        session['token'] = user['idToken']
        session['uid'] = user['localId']

        return session['token'], payload_data_user
    
    
    def update_user(self) -> None:
        self.firebase_service.update_document('users', session['uid'], self.to_dict())


    def logout_user(self) -> None:
        session.pop('token', None)
        
    
    def reset_password(self) -> None:
        self.firebase_service.get_auth().send_password_reset_email(
            email=self.email
        )
        
    

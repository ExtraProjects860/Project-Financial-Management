import pyrebase
import os
from dotenv import load_dotenv

class FirebaseService:
    def __init__(self):
        load_dotenv()
        config: dict[str, str] = {
            "apiKey": os.getenv("FIREBASE_API_KEY"),
            "databaseURL": os.getenv("FIREBASE_DATABASE_URL"),
            "authDomain": os.getenv("FIREBASE_AUTH_DOMAIN"),
            "projectId": os.getenv("FIREBASE_PROJECT_ID"),
            "storageBucket": os.getenv("FIREBASE_STORAGE_BUCKET"),
            "messagingSenderId": os.getenv("FIREBASE_MESSAGING_SENDER_ID"),
            "appId": os.getenv("FIREBASE_APP_ID"),
            "measurementId": os.getenv("FIREBASE_MEASUREMENT_ID"),
        }
        self.firebase = pyrebase.initialize_app(config)
        self.auth = self.firebase.auth()
        self.db = self.firebase.database()
       
     
    def get_auth(self):
        return self.auth
    
    
    def get_db(self):
        return self.db
    
    
    def add_document(self, collection: str, doc_id: str, data: dict):
        self.get_db().child(collection).child(doc_id).set(data)
     
       
    def get_document(self, collection: str, doc_id: str):
        return self.get_db().child(collection).child(doc_id).get()
    
    
    def update_document(self, collection: str, doc_id: str, data: dict):
        self.get_db().child(collection).child(doc_id).update(data)
      
      
    def delete_document(self, collection: str, doc_id: str):
        self.get_db().child(collection).child(doc_id).remove()
    
    
    def remove_item_in_document(self, collection: str, doc_id: str, item: str):
        self.get_db().child(collection).child(doc_id).child(item).remove()
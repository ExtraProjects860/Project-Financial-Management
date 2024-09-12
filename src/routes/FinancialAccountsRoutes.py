from flask import Blueprint, jsonify, request, Response, session
from src.controller.FinancialAccountsController import FinancialAccountsController
from src.controller.UserController import UserController
from src.middleware.middleware_validator import validate_body_in_request

financial_accounts_routes = Blueprint('financial_accounts_routes', __name__)

@financial_accounts_routes.route("/create-financial-accounts", methods=["POST"])
@UserController.login_required
def create_financial_accounts() -> tuple[Response, int]:
    try:
        data = request.get_json()
        
        if not validate_body_in_request(data):
            return jsonify({"error": "Missing required fields"}), 400
        
        data_account: dict = {
            "description": data["description"],
            "status": data["status"],
            "priority": data["priority"],
            "paymentDate": data["paymentDate"],
            "price": float(data["price"])
        }
        
        financial_accounts_controller = FinancialAccountsController(
            idUser=session["uid"],
            name_account=data["name_account"],
            data_account=data_account
        )
        
        financial_accounts_controller.add_account(data["type_account"])
        
        return jsonify({"message": "Financial account created successfully"}), 201
    except Exception as e:
        return jsonify({"error": "Error creating financial accounts: " + str(e)}), 500


@financial_accounts_routes.route("/update-financial-accounts", methods=["PUT"])
@UserController.login_required
def update_financial_accounts() -> tuple[Response, int]:
    try:
        data = request.get_json()
        
        if not validate_body_in_request(data):
            return jsonify({"error": "Missing required fields"}), 400
        
        data_account: dict = {
            "description": data["description"],
            "status": data["status"],
            "priority": data["priority"],
            "paymentDate": data["paymentDate"],
            "price": float(data["price"])
        }   
        
        financial_accounts_routes = FinancialAccountsController(
            idUser=session["uid"],
            name_account=data["name_account"],
            data_account=data_account
        )

        financial_accounts_routes.update_account(data["type_account"])

        return jsonify({"message": "Financial account updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": "Error updating financial accounts: " + str(e)}), 500
    

@financial_accounts_routes.route("/delete-financial-accounts", methods=["DELETE"])
@UserController.login_required
def delete_financial_accounts() -> tuple[Response, int]:
    try:
        data = request.get_json()
        
        if not validate_body_in_request(data):
            return jsonify({"error": "Missing required fields"}), 400
        
        financial_accounts_controller = FinancialAccountsController(
            idUser=session["uid"],
            name_account=data["name_account"],
            data_account=None
        )

        financial_accounts_controller.delete_account(data["type_account"])

        return jsonify({"message": "Financial account deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": "Error deleting financial accounts: " + str(e)}), 500

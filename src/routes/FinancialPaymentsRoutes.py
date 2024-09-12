from flask import Blueprint, jsonify, request, Response, session
from src.controller.FinancialPaymentsController import FinancialPaymentsController
from src.controller.UserController import UserController
from src.middleware.middleware_validator import validate_body_in_request

financial_payments_routes = Blueprint('financial_payments_routes', __name__)

@financial_payments_routes.route("/create-financial-payments", methods=["POST"])
@UserController.login_required
def create_financial_payments() -> tuple[Response, int]:
    try:
        data = request.get_json()
        
        if not validate_body_in_request(data):
            return jsonify({"error": "Missing required fields"}), 400
        
        financial_payments_controller = FinancialPaymentsController(
            idUser=session["uid"],
            type_account=data["type_account"],
            meta=data["meta"],
        )

        financial_payments_controller.create_payment_accounts()

        return jsonify({"message": "Financial payments created successfully"}), 201
    except Exception as e:
        return jsonify({"error": "Error creating financial payments: " + str(e)}), 500
    

@financial_payments_routes.route("/get-financial-payments", methods=["GET"])
@UserController.login_required
def get_financial_payments() -> tuple[Response, int]:
    try:
        financial_payments_controller = FinancialPaymentsController(
            idUser=session["uid"],
            type_account=None,
            meta=None,
        )

        financial_payments = financial_payments_controller.get_all_payments(session["uid"])

        return jsonify({"message": financial_payments}), 200
    except Exception as e:
        return jsonify({"error": "Error getting financial payments: " + str(e)}), 500
    

@financial_payments_routes.route("/rename-type-account", methods=["PUT"])
@UserController.login_required
def rename_type_account() -> tuple[Response, int]:
    try:
        data = request.get_json()
        
        if not validate_body_in_request(data):
            return jsonify({"error": "Missing required fields"}), 400
        
        financial_payments_controller = FinancialPaymentsController(
            idUser=session["uid"],
            type_account=data["type_account"],
            meta=None,
        )

        financial_payments_controller.rename_type_account(data["new_type_account"])

        return jsonify({"message": "Type account renamed successfully"}), 200
    except Exception as e:
        return jsonify({"error": "Error renaming type account: " + str(e)}), 500
    

@financial_payments_routes.route("/update-meta-type-account", methods=["PUT"])
@UserController.login_required
def update_meta_type_account() -> tuple[Response, int]:
    try:
        data = request.get_json()
        
        if not validate_body_in_request(data):
            return jsonify({"error": "Missing required fields"}), 400
        
        financial_payments_controller = FinancialPaymentsController(
            idUser=session["uid"],
            type_account=data["type_account"],
            meta=data["new_meta"],
        )

        financial_payments_controller.update_meta_type_account()

        return jsonify({"message": "Meta type account updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": "Error updating meta type account: " + str(e)}), 500
    

@financial_payments_routes.route("/delete-type-account", methods=["DELETE"])
@UserController.login_required
def delete_type_account() -> tuple[Response, int]:
    try:
        data = request.get_json()
        
        if not validate_body_in_request(data):
            return jsonify({"error": "Missing required fields"}), 400
        
        financial_payments_controller = FinancialPaymentsController(
            idUser=session["uid"],
            type_account=data["type_account"],
            meta=None,
        )

        financial_payments_controller.delete_type_account()

        return jsonify({"message": "Type Account and all accounts deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": "Error deleting all accounts: " + str(e)}), 500
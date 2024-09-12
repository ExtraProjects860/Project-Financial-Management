from flask import Blueprint, jsonify, request, Response, session
from src.controller.FinancialPaymentsLogicController import FinancialPaymentsLogicController
from src.controller.UserController import UserController
from src.middleware.middleware_validator import validate_body_in_request

financial_payments_logic_routes = Blueprint('financial_payments_logic_routes', __name__)

@financial_payments_logic_routes.route("/sum-total-type-account-payments", methods=["GET"])
@UserController.login_required
def sum_total_type_account_payments() -> tuple[Response, int]:
    try:
        financial_payments_logic_controller = FinancialPaymentsLogicController()

        total: dict[str, float] = financial_payments_logic_controller.sum_total_type_account_payments(session["uid"])
        
        return jsonify({"message": "Total per type account retrieved successfully",
                        "data": total}), 200
    except Exception as e:
        return jsonify({"error": "Error getting financial payments: " + str(e)}), 500
    

@financial_payments_logic_routes.route("/sum-total-balance", methods=["GET"])
@UserController.login_required
def sum_total_balance() -> tuple[Response, int]:
    try:
        financial_payments_logic_controller = FinancialPaymentsLogicController()

        total: float = financial_payments_logic_controller.sum_total_balance(session["uid"])
        
        return jsonify({"message": "Total balance retrieved successfully", 
                        "data": total}), 200
    except Exception as e:
        return jsonify({"error": "Error getting financial payments: " + str(e)}), 500
    

@financial_payments_logic_routes.route("/verify-type-account-not-pay", methods=["GET"])
@UserController.login_required
def verify_type_account_not_pay() -> tuple[Response, int]:
    try:
        financial_payments_logic_controller = FinancialPaymentsLogicController()

        not_pay: dict[str, list[str]] = financial_payments_logic_controller.verify_type_account_not_pay(session["uid"])
        
        return jsonify({"message": "Type account not pay retrieved successfully", 
                        "data": not_pay}), 200
    except Exception as e:
        return jsonify({"error": "Error getting financial payments: " + str(e)}), 500
    

@financial_payments_logic_routes.route("/verify-accounts-payment-date", methods=["GET"])
@UserController.login_required
def verify_accounts_payment_date() -> tuple[Response, int]:
    try:
        financial_payments_logic_controller = FinancialPaymentsLogicController()

        payment_accounts_today: dict[str, list[str]] = financial_payments_logic_controller.verify_accounts_payment_date(session["uid"])
        
        return jsonify({"message": "Accounts payment date retrieved successfully",
                        "data": payment_accounts_today}), 200
    except Exception as e:
        return jsonify({"error": "Error getting financial payments: " + str(e)}), 500
    
    
@financial_payments_logic_routes.route("/all-payments-per-type-account", methods=["GET"])
@UserController.login_required
def all_payments_per_type_account() -> tuple[Response, int]:
    try:
        financial_payments_logic_controller = FinancialPaymentsLogicController()

        payments: dict[str, list[str]] = financial_payments_logic_controller.all_payments_per_type_account(session["uid"])
        
        return jsonify({"message": "All payments per type account retrieved successfully",
                        "data": payments}), 200
    except Exception as e:
        return jsonify({"error": "Error getting financial payments: " + str(e)}), 500        
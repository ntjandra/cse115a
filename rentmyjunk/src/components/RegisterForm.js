import React from "react";
import Form from "./Form";

import 'bootstrap/dist/css/bootstrap.min.css';

class RegisterForm extends Form {
    render() {
        return (
            <div class="container center_div">
            <h1 align="center"><font face="Trebuchet MS"><b>Create An Account</b></font></h1>
            <form action="/action_page.php">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" className="form-control" id="username" placeholder="Enter username" name="username" />
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" />
                </div>
                <div class="form-group">
                    <label for="pwd">Password</label>
                    <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pwd" />
                </div>
                <div class="form-group">
                    <label for="pwdConf">Confirm Password</label>
                    <input type="password" className="form-control" id="pwdConf" placeholder="Confirm password" name="pwdConf" />
                </div>
                <form action="?" method="POST">
                    <div class="g-recaptcha" data-sitekey="6Lf0_b4UAAAAAKZX3E_Ec_bqVre6B6Xpn_3Vfd-b"></div>
                </form>
                <button type="submit">Sign Up</button>
            </form>
            </div>
        );
    }
}

export default RegisterForm; 
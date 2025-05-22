import './login.css'; 


function Login() {
    
    return (
        
        
        <div className='container-fluid main-login'>     
        <div className='row '>
        <div className='col-12 col-sm-10 col-md-8 col-lg-6 login-container '>
        
        <h2 className=" login-title  mt-5 text-start">Login</h2>
        
        <p className="text-start">
        Don't you have an account?{''}
        <a href="/signup" className="link-custom">Signup</a>
        </p>
        
        <div className="mb-2">
        <label htmlFor="inputEmail" className="form-label"></label>
        <input type="email" className="form-control" id="inputEmail" placeholder="Inserisci l'email" />
        </div>
        
        <div className="mb-2">
        <label htmlFor="inputPassword" className="form-label"></label>
        <input type="password" className="form-control" id="inputPassword" placeholder="Inserisci la password" />
        </div>
        
        <button type="submit" className="button-custom w-100">Continue</button>

        <p className="mt-3 text-center">
        {' '}
        <a href="/signup" className="link-custom ">Forgot password?</a>
        </p>

        </div>
        </div>
        </div>
    );
}

export default Login;

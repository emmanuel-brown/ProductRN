import React from 'react'

const Navbar = (props) => {
    return(
        <React.Fragment>
            <nav id="navigation">
                <header id="title">
                    <h1>Future Fancy</h1>
                </header>
                <div id="navigator">
                    <div><p><a href="/">Home</a></p></div>
                    <div><p><a href="/Product">Product</a></p></div>
                    <div><p><a href="/Contact">Contact</a></p></div>
                    <div onClick={ props.signIn } style={{display: props.hasLogin ? 'block' : 'none'}}><p>Login</p></div>
                </div>
            </nav>
        </React.Fragment>
    )
}

export default Navbar
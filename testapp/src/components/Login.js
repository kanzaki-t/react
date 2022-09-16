import './Login.css';
import { useNavigate } from "react-router-dom";



const Login = () => {
    const onShow = () => {
        document.getElementById('hidePage').style.display= "block";
    }

    const inHide = () => {
        document.getElementById('hidePage').style.display= "none";
    }

    const navigate = useNavigate()

    return (
        <div className='Login'>
            <button className="signin" onClick={onShow}>
                Login
            </button>
            <div id='hidePage'>
                <div className="overlay" onClick={inHide}></div>

                <div className="open">
                    <div className="flex">
                        <div className="login_page">
                            <h2>ログイン</h2>

                            <form className="login_form">
                                <input className="login_userid" placeholder="メールアドレス" />
                                <input className="login_userpass" placeholder="パスワード" />
                                <input className="login_button" type="button" value="送信" onClick={() => navigate('/managementpage')} /*target="_blank"*/ />
                            </form>

                            <div className="sns">
                                <button id="twitter">
                                    <img src={`${process.env.PUBLIC_URL}/twitter.png`} alt="" />
                                    {/* // publicから画像を読み込み方 */}
                                </button>

                                <button id="facebook">
                                    <img src={`${process.env.PUBLIC_URL}/fb.png`} alt="" />
                                </button>

                                <button id="google">
                                    <img src={`${process.env.PUBLIC_URL}/google.png`} alt="" />
                                </button>

                                <button id="apple">
                                    <img src={`${process.env.PUBLIC_URL}/apple.png`} alt="" />
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
import logo from './sus.svg';
import './Homepage.css';
import Login from './Login';

function Homepage() {
  // 组件挂载完毕调用，并只调用一次
  componentDidMount() {

    window.onload = function () {
      console.log('window.onload');
      //获取画布对象

      var canvas = document.getElementById("canvas");

      //获取画布的上下文

      var context = canvas.getContext("2d");

      //获取浏览器屏幕的宽度和高度

      var W = window.innerWidth;

      var H = window.innerHeight;

      //设置canvas的宽度和高度

      canvas.width = W;

      canvas.height = H;

      //每个文字的字体大小

      var fontSize = 16;

      //计算列

      var colunms = Math.floor(W / fontSize);

      //记录每列文字的y轴坐标

      var drops = [];

      //给每一个文字初始化一个起始点的位置

      for (var i = 0; i < colunms; i++) {

        drops.push(0);

      }

      //运动的文字

      var str = "0123456789abcdefghijklmnopqrstuvwsyz";

      //4:fillText(str,x,y);原理就是去更改y的坐标位置

      //绘画的函数

      function draw() {

        context.fillStyle = "rgba(0,0,0,0.05)";

        context.fillRect(0, 0, W, H);

        //给字体设置样式

        context.font = "700 " + fontSize + "px 微软雅黑";

        //给字体添加颜色

        context.fillStyle = "#00cc33"; //可以rgb,hsl, 标准色，十六进制颜色

        //写入画布中

        for (var i = 0; i < colunms; i++) {

          var index = Math.floor(Math.random() * str.length);

          var x = i * fontSize;

          var y = drops[i] * fontSize;

          context.fillText(str[index], x, y);

          //如果要改变时间，肯定就是改变每次他的起点

          if (y >= canvas.height && Math.random() > 0.99) {

            drops[i] = 0;

          }

          drops[i]++;

        }

      };

      function randColor() {

        var r = Math.floor(Math.random() * 256);

        var g = Math.floor(Math.random() * 256);

        var b = Math.floor(Math.random() * 256);

        return "rgb(" + r + "," + g + "," + b + ")";

      }

      draw();

      setInterval(draw, 30);

    };
  };

  return (
    <div>
      <canvas id="canvas"></canvas>

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            人と企業の笑顔が見たい
          </p>
          <a
            className="App-link"
            href="https://www.sus-g.co.jp/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ホームページ
          </a>

          <div>
            <Login />
          </div>
        </header>
      </div>
    </div>
  );
}

export default Homepage;
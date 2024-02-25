const { createCanvas, registerFont } = require('canvas');

module.exports.handler = async (event) => {
  console.log(event.queryStringParameters.text)

  const text = event.queryStringParameters.text || '黒子';
  const canvas = createCanvas(200, 100);
  const ctx = canvas.getContext('2d');

  // フォントを強制指定する
  // 使用フォント
  // https://fonts.google.com/specimen/M+PLUS+Rounded+1c
  registerFont('./M_PLUS_Rounded_1c/MPLUSRounded1c-Medium.ttf', { family: 'myFont' });
  ctx.font = '20px myFont';

  // テキストを白色で描画
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  // Canvasを画像としてレスポンスとして返す
  const base64String = canvas.toDataURL().replace(/^data:image\/png;base64,/, '');
  console.log('base64String:', base64String);
  const response = {
    statusCode: 200,
    headers: { "Content-Type": "image/png" },
    body: base64String,
    'isBase64Encoded': true
  };
  return response;
};

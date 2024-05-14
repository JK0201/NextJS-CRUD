import { connectDB } from '@/util/database';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  const db = (await connectDB).db('next');

  if (req.method === 'GET') {
    try {
      let result = await db.collection('user_cred').findOne(req.query);
      if (result) {
        return res.status(200).json(false);
      }
      res.status(200).json(true);
    } catch (err) {
      return res.status(500).json({ msg: 'Unexpected error occurred' });
    }
  }

  if (req.method === 'POST') {
    let credData = req.body;

    if (!emailValid(credData.email)) {
      return res.status(400).json({ msg: '이메일을 확인해 주세요' });
    } else if (!passValid(credData.pass)) {
      return res.status(400).json({ msg: '비밀번호 형식을 확인해 주세요' });
    } else if (!nicknameValid(credData.name)) {
      return res.status(400).json({ msg: '닉네임을 확인해 주세요' });
    }

    req.body.pass = await bcrypt.hash(req.body.pass, 10);
    req.body.role = 'norm';

    try {
      await db.collection('user_cred').insertOne(req.body);
      res.status(200).json({ msg: '회원가입을 축하드립니다!' });
    } catch (err) {
      return res.status(500).json({ msg: 'Unexpected error occured' });
    }
  }
}

function emailValid(email) {
  let emailChk = /^[a-zA-Z0-9._%+-]{1,20}@[a-zA-Z0-9.-]{1,20}\.[a-zA-Z]{2,6}$/.test(email);
  return emailChk;
}

function passValid(pass) {
  let passChk = /^[a-zA-Z0-9]{6,12}$/.test(pass);
  return passChk;
}

function nicknameValid(name) {
  let nicknameChk = /^[a-zA-Z가-힣0-9]{4,10}$/.test(name);
  return nicknameChk;
}

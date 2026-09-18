import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/kullanici.js'

const Detay = async (req, res) => {
    const { id } = req.params;

    try {
     
        const user = await User.findById(id);


        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const duzenle = async (req, res) => {
    const { id } = req.params; 
    const updatedFields = req.body;
  
    try {

        const user = await User.findById(id);
  

        if (!user) {
            return res.status(404).send("User not found");
        }
  

        Object.assign(user, updatedFields);
  
       
        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 12);
            user.password = hashedPassword;
        }
  
        const updatedUser = await user.save();
  
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
  };
const users=async (req,res)=>{

    try {
        const postMessage=await User.find();
        res.status(200).json(postMessage)
     
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}
const Delete = async (req, res) => {
    const { email } = req.params;
  
    try {

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
      }
  

      await User.findByIdAndRemove(user._id);
  

      res.status(200).json({ message: 'Kullanıcı silindi' });
    } catch (error) {
      res.status(500).json({ message: 'Bir hata oluştu' });
    }
  };


const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
      
        const kullanici = await User.findOne({ email });

        if (kullanici) return res.status(400).json({ message: 'Kullanıcı Zaten Bulunuyor' });

        if (password !== confirmPassword) return res.status(400).json({ message: 'Parolalar uyuşmadı!' });


        const sifrelenmisParola = await bcrypt.hash(password, 12);


        const result = await User.create({
            email,
            password: sifrelenmisParola,
            firstName,
            lastName,
        });


        const token = jwt.sign({ email: result.email, id: result._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

      
        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: 'Bir hata oluştu' });
    }
};
const signPassword = async (req, res) => {
    try {
        const { email, newPassword, confirmPassword } = req.body;
        if (!email || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: 'Lütfen tüm alanları doldurun' });
        }
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'Yeni şifreler eşleşmiyor' });
        }
        if (newPassword.length > 20) {
            return res.status(400).json({ message: 'Yeni şifre 20 karakteri geçemez' });
        }
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Şifre başarıyla güncellendi' });
    } catch (error) {
        res.status(500).json({ message: 'Sunucu hatası' });
    }
};


  
const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
       
        const kullanici = await User.findOne({ email });

        if (!kullanici) return res.status(404).json({ message: 'Kullanıcı Bulunamadı' });


        const isMatch = await bcrypt.compare(password, kullanici.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Parolayı doğru giriniz' });
        }

        
        const token = jwt.sign({ email: kullanici.email, id: kullanici._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.status(200).json({ result: kullanici, token });
    } catch (error) {
        res.status(500).json({ message: 'Bir hata oluştu' });
    }
}

export { signin, signup,users,Delete,duzenle,Detay,signPassword };
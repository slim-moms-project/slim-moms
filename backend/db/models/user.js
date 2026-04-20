import { Schema, model } from 'mongoose';

// User modeli oluşturulacak
const usersSchema = new Schema({});

// Kullanıcı verisi JSON'a dönüştürüldüğünde şifreyi otomatik olarak kaldırır
usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = model('users', usersSchema);

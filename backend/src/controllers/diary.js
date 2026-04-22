import { DiaryCollection } from '../db/models/diary.js';
import { isValidObjectId } from 'mongoose';

const getUserIdOrRespond = (req, res) => {
  const userId = req.user?._id;
  if (!userId) {
    res.status(401).json({
      status: 'error',
      code: 401,
      message: 'Unauthorized',
    });
    return null;
  }
  return userId;
};

// Diary Ekleme POST (/api/diary)
export const addDiaryController = async (req, res) => {
  const userId = getUserIdOrRespond(req, res);
  if (!userId) return;

  const { productId, date, amount, calories } = req.body; // validation ile kontrol edilecek

  if (!isValidObjectId(productId)) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Invalid productId format.',
    });
  }

  const newDiary = await DiaryCollection.create({
    userId,
    productId,
    date,
    amount,
    calories,
  });
  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Diary created successfully',
    data: newDiary,
  });
};

// Diary Listeleme GET (/api/diary)
export const getDiaryController = async (req, res) => {
  const userId = getUserIdOrRespond(req, res);
  if (!userId) return;

  const { date } = req.query;
  let filter = { userId };

  // Modelde date tipi 'Date' olduğu için, günün başlangıcı ve bitişi arasında arama yapıyoruz.
  if (date) {
    const searchDate = new Date(date);
    if (Number.isNaN(searchDate.getTime())) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Invalid date format. Use YYYY-MM-DD.',
      });
    }

    const startOfDay = new Date(searchDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(searchDate.setHours(23, 59, 59, 999));

    filter.date = {
      $gte: startOfDay,
      $lte: endOfDay,
    };
  }
  const diaryEntries = await DiaryCollection.find(filter);
  res.status(200).json({
    status: 'success',
    code: 200,
    data: diaryEntries,
  });
};

// Diary Silme DELETE (/api/diary/:id)
export const deleteDiaryController = async (req, res) => {
  const userId = getUserIdOrRespond(req, res);
  if (!userId) return;

  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Invalid diary id format.',
    });
  }

  const deletedDiary = await DiaryCollection.findOneAndDelete({
    _id: id,
    userId,
  });

  if (!deletedDiary) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message:
        'No record was found, or you do not have permission to perform this action.',
    });
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Record successfully deleted.',
    data: deletedDiary,
  });
};

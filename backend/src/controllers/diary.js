import { DiaryCollection } from '../db/models/diary.js';

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

const parseDateOnly = (dateString) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateString);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const parsedDate = new Date(year, month - 1, day);

  if (
    parsedDate.getFullYear() !== year ||
    parsedDate.getMonth() !== month - 1 ||
    parsedDate.getDate() !== day
  ) {
    return null;
  }

  return parsedDate;
};

const formatDateOnly = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const serializeDiaryEntry = (entry) => {
  const diaryObject = entry.toObject ? entry.toObject() : entry;
  return {
    ...diaryObject,
    date: formatDateOnly(diaryObject.date),
  };
};

// Diary Ekleme POST (/api/diary)
export const addDiaryController = async (req, res) => {
  const userId = getUserIdOrRespond(req, res);
  if (!userId) return;

  const { productId, date, amount, calories } = req.body; // validation ile kontrol edilecek
  const parsedDate = parseDateOnly(date);

  if (!parsedDate) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Invalid date format. Use YYYY-MM-DD.',
    });
  }

  const normalizedDate = new Date(parsedDate);
  normalizedDate.setHours(0, 0, 0, 0);

  const newDiary = await DiaryCollection.create({
    userId,
    productId,
    date: normalizedDate,
    amount,
    calories,
  });
  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Diary created successfully',
    data: serializeDiaryEntry(newDiary),
  });
};

// Diary Listeleme GET (/api/diary)
export const getDiaryController = async (req, res) => {
  const userId = getUserIdOrRespond(req, res);
  if (!userId) return;

  const { date } = req.query;
  let filter = { userId };

  // YYYY-MM-DD tarihini local timezone'da parse edip gün aralığı oluşturuyor.
  if (date) {
    const searchDate = parseDateOnly(date);
    if (!searchDate) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Invalid date format. Use YYYY-MM-DD.',
      });
    }

    const startOfDay = new Date(searchDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(searchDate);
    endOfDay.setHours(23, 59, 59, 999);

    filter.date = {
      $gte: startOfDay,
      $lte: endOfDay,
    };
  }
  const diaryEntries = await DiaryCollection.find(filter);
  res.status(200).json({
    status: 'success',
    code: 200,
    data: diaryEntries.map(serializeDiaryEntry),
  });
};

// Diary Silme DELETE (/api/diary/:id)
export const deleteDiaryController = async (req, res) => {
  const userId = getUserIdOrRespond(req, res);
  if (!userId) return;

  const { id } = req.params;

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
    data: serializeDiaryEntry(deletedDiary),
  });
};

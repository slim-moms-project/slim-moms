import { createSlice } from '@reduxjs/toolkit';
import {
  fetchDiary,
  addProduct,
  removeProduct,
} from './diaryOperations'; // Dosya yolunun doğru olduğundan emin ol (aynı klasördeyseler ./ yeterlidir)

const today = new Date().toISOString().slice(0, 10);

const diarySlice = createSlice({
  name: 'diary',
  initialState: {
    products: [],
    date: today,
    summary: {
      totalCalories: 0,
      dailyRate: null,
      percentsOfDailyRate: null,
    },
    isLoading: false,
    error: null,
  },
  reducers: {
    setDate(state, action) {
      state.date = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- GET: GÜNLÜĞÜ GETİRME ---
      .addCase(fetchDiary.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDiary.fulfilled, (state, action) => {
        state.isLoading = false;
console.log("🚨 GET İSTEĞİNDEN GELEN TAM VERİ:", action.payload);
        // Ürünleri listeye alıyoruz (Backend'in yapısına göre güvenli çekim)
        const gelenUrunler = action.payload?.data?.products || action.payload?.products || action.payload?.data || [];
        state.products = Array.isArray(gelenUrunler) ? gelenUrunler : [];

        // Backend summary gönderiyorsa al, göndermiyorsa Redux ile kendimiz toplayalım
        const gelenOzet = action.payload?.data?.summary || action.payload?.summary;

        if (gelenOzet) {
          state.summary = { ...state.summary, ...gelenOzet };
        } else {
          // Gelen ürünlerin kalorilerini topla
          const toplamKalori = state.products.reduce((toplam, urun) => toplam + (urun.calories || 0), 0);
          state.summary = {
            ...state.summary,
            totalCalories: Math.round(toplamKalori)
          };
        }
      })
      .addCase(fetchDiary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.products = []; // Listeyi boşalt
        state.summary = {
          ...state.summary, // dailyRate (günlük limit) gibi bilgileri koru
          totalCalories: 0,
          };
      })

      // --- POST: ÜRÜN EKLEME ---
      .addCase(addProduct.fulfilled, (state, action) => {
        const yeniUrun = action.payload.data;

        // Yeni ürünü listeye ekle
        state.products.push(yeniUrun);

        // Eklenen ürünün kalorisini anlık olarak toplam kaloriye ekle
        const eklenenKalori = yeniUrun.calories || 0;
        state.summary.totalCalories = (state.summary.totalCalories || 0) + Math.round(eklenenKalori);

        // Eğer backend ürün ekleyince yeni bir summary de gönderirse onu da al
        const yeniOzet = action.payload?.data?.summary || action.payload?.summary;
        if (yeniOzet) {
            state.summary = { ...state.summary, ...yeniOzet };
        }
      })

      // --- DELETE: ÜRÜN SİLME ---
      .addCase(removeProduct.fulfilled, (state, action) => {
        // Hangi ürünü sildiğimizi bulalım (Kalorisini düşmek için)
        const silinenUrun = state.products.find(p => p._id === action.payload.id || p.id === action.payload.id);

        // Ürünü ekrandaki listeden kaldır
        state.products = state.products.filter(
          (p) => p._id !== action.payload.id && p.id !== action.payload.id
        );

        // Silinen ürünün kalorisini anlık olarak toplam kaloriden düş (Sıfırın altına inmesin)
        if (silinenUrun) {
           const dusulecekKalori = silinenUrun.calories || 0;
           state.summary.totalCalories = Math.max(0, (state.summary.totalCalories || 0) - Math.round(dusulecekKalori));
        }

        // Eğer backend silme işleminden sonra yeni bir summary gönderirse onu da al
        const yeniOzet = action.payload?.data?.summary || action.payload?.summary;
        if (yeniOzet) {
             state.summary = { ...state.summary, ...yeniOzet };
        }
      });
  },
});

export const { setDate } = diarySlice.actions;
export default diarySlice.reducer;

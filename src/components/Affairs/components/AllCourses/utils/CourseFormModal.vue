<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs select-none"
    @click.self="$emit('close')"
  >
    <div class="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-scale-in">
      <!-- 1. ترويسة المودال -->
      <div class="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/80 shrink-0">
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-2xl flex items-center justify-center border"
            :class="
              isEdit
                ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-300 border-blue-200 dark:border-blue-800'
                : 'bg-primary-50 dark:bg-primary-950/70 text-primary-600 dark:text-primary-300 border-primary-200 dark:border-primary-800'
            "
          >
            <Edit v-if="isEdit" class="w-5 h-5" />
            <Plus v-else class="w-5 h-5" />
          </div>
          <div>
            <h3 class="text-sm sm:text-base font-black text-slate-800 dark:text-slate-100 font-heading">
              {{ isEdit ? 'تعديل بيانات الدورة التدريبية' : 'إضافة دورة تدريبية جديدة للكتالوج' }}
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {{ isEdit ? 'تعديل اسم الدورة، المحاضر المسؤول، التوصيف الأكاديمي، والأسعار المعتمدة للفئات' : 'تسجيل دورة جديدة بالكتالوج، تحديد المحاضر المسؤول، واعتماد أسعار الفئات الأربعة' }}
            </p>
          </div>
        </div>

        <button
          type="button"
          class="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
          @click="$emit('close')"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <!-- 2. نموذج الإدخال المطابق للـ ERD -->
      <form class="p-4 sm:p-5 space-y-4 overflow-y-auto custom-scrollbar text-xs" @submit.prevent="handleSubmit">
        <!-- أ. اسم الدورة في الكتالوج (Courses.Name) -->
        <div class="space-y-1">
          <label class="font-bold text-slate-700 dark:text-slate-200 block">
            اسم الدورة في الكتالوج <span class="text-rose-500">*</span>
          </label>
          <input
            v-model="form.name"
            type="text"
            placeholder="مثال: الأمن السيبراني واختبار الاختراق CEH v12"
            required
            class="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-xs font-medium"
          />
        </div>

        <!-- ب. المحاضر المعتمد للدورة من قائمة المحاضرين المسجلين في السيستم -->
        <div class="space-y-1.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
          <label class="font-bold text-slate-700 dark:text-slate-200 block text-xs flex items-center gap-1.5">
            <UserCheck class="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>المحاضر المعتمد (المسؤول عن شرح الدورة) <span class="text-rose-500">*</span></span>
          </label>

          <Select
            v-model="form.instructorId"
            :options="instructorOptions"
            option-label="displayName"
            option-value="id"
            filter
            filter-placeholder="ابحث بالاسم أو التخصص..."
            placeholder="اختر المحاضر الذي سيشرح الدورة من قائمة المحاضرين..."
            class="w-full text-xs font-bold rounded-xl h-10 flex items-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
          >
            <template #option="{ option }">
              <div class="flex items-center justify-between w-full py-0.5 text-xs">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-[10px]">
                    <UserCheck class="w-3.5 h-3.5" />
                  </div>
                  <span class="font-bold text-slate-800 dark:text-slate-100">{{ option.name }}</span>
                </div>
                <span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/60">
                  {{ option.specialty }}
                </span>
              </div>
            </template>
          </Select>

          <!-- بطاقة معاينة المحاضر المختار -->
          <div
            v-if="selectedInstructor"
            class="mt-2 p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/60 flex items-center justify-between text-xs animate-fade-in"
          >
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
                <UserCheck class="w-4 h-4" />
              </div>
              <div>
                <span class="font-bold text-slate-800 dark:text-slate-100 block">{{ selectedInstructor.name }}</span>
                <span class="text-[10px] text-emerald-700 dark:text-emerald-300 font-semibold">{{ selectedInstructor.specialty }}</span>
              </div>
            </div>

            <div class="text-[10px] text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1.5 shrink-0">
              <Phone class="w-3 h-3 text-slate-400" />
              <span>{{ selectedInstructor.phone }}</span>
            </div>
          </div>
          <p v-else class="text-[11px] text-slate-400 pt-0.5">
            يتم اختيار المحاضر المعتمد من قاعدة بيانات المحاضرين المسجلين في السيستم.
          </p>
        </div>

        <!-- ج. التوصيف والمحتوى الأكاديمي (Courses.Description) -->
        <div class="space-y-1">
          <label class="font-bold text-slate-700 dark:text-slate-200 block">
            توصيف ومحتوى الدورة <span class="text-rose-500">*</span>
          </label>
          <textarea
            v-model="form.description"
            rows="3"
            placeholder="اكتب نبذة عن أهداف الدورة، المحتوى التدريبي، والمخرجات التعليمية..."
            required
            class="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-xs font-medium resize-none"
          ></textarea>
        </div>

        <!-- د. حالة الدورة في الكتالوج (Courses.IsActive) -->
        <div class="space-y-1">
          <label class="font-bold text-slate-700 dark:text-slate-200 block">
            حالة الدورة بالكتالوج (IsActive)
          </label>
          <label class="flex items-center gap-2.5 h-10 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 cursor-pointer">
            <input
              v-model="form.isActive"
              type="checkbox"
              class="w-4 h-4 rounded text-primary-600 focus:ring-primary-500 cursor-pointer"
            />
            <span class="font-bold" :class="form.isActive ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-500'">
              {{ form.isActive ? 'الدورة نشطة ومتاحة لفتح دورات انعقاد (دفعات)' : 'الدورة معطلة وموقوفة مؤقتاً بالكتالوج' }}
            </span>
          </label>
        </div>

        <!-- هـ. أسعار الدورة بحسب فئات المتدربين (CoursePricings) -->
        <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-3">
          <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
            <h4 class="font-black text-slate-800 dark:text-slate-100 text-xs flex items-center gap-1.5">
              <DollarSign class="w-4 h-4 text-primary-600" />
              <span>أسعار الدورة المعتمدة بحسب الفئات (CoursePricings)</span>
            </h4>
            <span class="text-[10px] text-slate-400 font-mono">
              بالجنيه المصري (ج.م)
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <!-- 1. سعر المدنيين -->
            <div class="space-y-1">
              <label class="font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>سعر فئة المدنيين (Civilian):</span>
                <span class="text-[10px] text-slate-400">السعر الأساسي</span>
              </label>
              <input
                v-model.number="form.pricings.Civilian"
                type="number"
                min="0"
                step="50"
                required
                class="w-full h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-mono font-bold text-xs"
              />
            </div>

            <!-- 2. سعر ضباط القوات المسلحة -->
            <div class="space-y-1">
              <label class="font-bold text-primary-800 dark:text-primary-300 flex items-center justify-between">
                <span>سعر ضباط ق.م (MilitaryOfficer):</span>
                <span class="text-[10px] text-primary-600 font-bold">خصم 50%</span>
              </label>
              <input
                v-model.number="form.pricings.MilitaryOfficer"
                type="number"
                min="0"
                step="50"
                required
                class="w-full h-9 px-3 rounded-xl border border-primary-200 dark:border-primary-800/80 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-mono font-bold text-xs"
              />
            </div>

            <!-- 3. سعر عائلات ضباط القوات المسلحة -->
            <div class="space-y-1">
              <label class="font-bold text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                <span>عائلات ضباط ق.م (MilitaryFamily):</span>
                <span class="text-[10px] text-emerald-600 font-bold">خصم 40%</span>
              </label>
              <input
                v-model.number="form.pricings.MilitaryFamily"
                type="number"
                min="0"
                step="50"
                required
                class="w-full h-9 px-3 rounded-xl border border-emerald-200 dark:border-emerald-800/80 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-mono font-bold text-xs"
              />
            </div>

            <!-- 4. سعر ضباط الشرطة وعائلاتهم -->
            <div class="space-y-1">
              <label class="font-bold text-blue-800 dark:text-blue-300 flex items-center justify-between">
                <span>الشرطة وعائلاتهم (PoliceOfficerOrFamily):</span>
                <span class="text-[10px] text-blue-600 font-bold">خصم 35%</span>
              </label>
              <input
                v-model.number="form.pricings.PoliceOfficerOrFamily"
                type="number"
                min="0"
                step="50"
                required
                class="w-full h-9 px-3 rounded-xl border border-blue-200 dark:border-blue-800/80 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-mono font-bold text-xs"
              />
            </div>
          </div>
        </div>

        <!-- 3. أسفل المودال: أزرار الحفظ والإلغاء -->
        <div class="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2.5">
          <button
            type="button"
            class="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors cursor-pointer"
            @click="$emit('close')"
          >
            إلغاء
          </button>
          <button
            type="submit"
            class="px-5 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Check class="w-4 h-4" />
            <span>{{ isEdit ? 'حفظ التعديلات' : 'إضافة الدورة للكتالوج' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import Select from 'primevue/select';
import {
  Plus,
  Edit,
  X,
  Check,
  DollarSign,
  UserCheck,
  Phone,
} from 'lucide-vue-next';
import { INITIAL_COURSE_FORM } from '../helpers/courseConstants';
import { INITIAL_INSTRUCTORS } from '../helpers/courseMockData';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  course: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(['close', 'save']);

const isEdit = computed(() => Boolean(props.course && props.course.id));

const form = ref(JSON.parse(JSON.stringify(INITIAL_COURSE_FORM)));

// خيارات المحاضرين المسجلين في السيستم
const instructorOptions = computed(() => {
  return INITIAL_INSTRUCTORS.filter((i) => i.isActive).map((i) => ({
    id: i.id,
    name: i.name,
    specialty: i.specialty,
    phone: i.phone,
    displayName: `${i.name} — (${i.specialty})`,
  }));
});

// المحاضر المحدد حالياً
const selectedInstructor = computed(() => {
  return instructorOptions.value.find((i) => i.id === form.value.instructorId) || null;
});

watch(
  () => [props.isOpen, props.course],
  () => {
    if (props.isOpen && props.course) {
      form.value = {
        id: props.course.id,
        name: props.course.name || '',
        description: props.course.description || '',
        instructorId: props.course.instructorId || null,
        isActive: props.course.isActive !== false,
        pricings: {
          Civilian: props.course.pricings?.Civilian ?? 4000,
          MilitaryOfficer: props.course.pricings?.MilitaryOfficer ?? 2000,
          MilitaryFamily: props.course.pricings?.MilitaryFamily ?? 2400,
          PoliceOfficerOrFamily: props.course.pricings?.PoliceOfficerOrFamily ?? 2600,
        },
      };
    } else if (props.isOpen) {
      form.value = JSON.parse(JSON.stringify(INITIAL_COURSE_FORM));
      // اختيار أول محاضر افتراضياً لتسهيل الاستخدام
      if (instructorOptions.value.length > 0 && !form.value.instructorId) {
        form.value.instructorId = instructorOptions.value[0].id;
      }
    }
  },
  { immediate: true }
);

function handleSubmit() {
  if (!form.value.name.trim()) return;
  const inst = selectedInstructor.value;
  emit('save', {
    ...JSON.parse(JSON.stringify(form.value)),
    instructorName: inst?.name || '',
    instructorSpecialty: inst?.specialty || '',
  });
}
</script>

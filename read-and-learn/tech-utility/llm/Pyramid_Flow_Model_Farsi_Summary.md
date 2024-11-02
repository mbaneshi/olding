### ترجمه و خلاصه:

**Pyramid Flow** یک روش نوین و بهینه برای تولید ویدیوهای اتورگرسیو است که بر اساس **Flow Matching** طراحی شده است. این مدل با استفاده از دیتاست‌های متن‌باز آموزش داده شده و قادر به تولید ویدیوهای باکیفیت 10 ثانیه‌ای با رزولوشن 768p و نرخ فریم 24 FPS است. همچنین از تولید تصویر به ویدیو به‌صورت طبیعی پشتیبانی می‌کند.

### ویژگی‌های کلیدی:
- تولید ویدیوهای باکیفیت 10 ثانیه‌ای در 768p و 5 ثانیه‌ای در 384p.
- پشتیبانی از تبدیل تصویر به ویدیو.
- بهینه برای آموزش و تولید به کمک **Flow Matching**.

### اخبار اخیر:
- 2024.10.11: دموی Hugging Face در دسترس است.
- 2024.10.10: گزارش فنی، صفحه پروژه و مدل **Pyramid Flow** منتشر شد.

### نصب:
پیشنهاد می‌شود محیط را با **conda** تنظیم کنید. این کد از **Python 3.8.10** و **PyTorch 2.1.2** استفاده می‌کند.

```bash
git clone https://github.com/jy0205/Pyramid-Flow
cd Pyramid-Flow

# ایجاد محیط با conda
conda create -n pyramid python==3.8.10
conda activate pyramid
pip install -r requirements.txt
```

سپس مدل را از **Hugging Face** دانلود کنید:

```python
from huggingface_hub import snapshot_download

model_path = 'PATH'   # مسیر محلی برای ذخیره مدل
snapshot_download("rain1011/pyramid-flow-sd3", local_dir=model_path, local_dir_use_symlinks=False, repo_type='model')
```

### استفاده:
برای استفاده از مدل، ابتدا مدل دانلود شده را بارگذاری کنید:

```python
import torch
from PIL import Image
from pyramid_dit import PyramidDiTForVideoGeneration
from diffusers.utils import load_image, export_to_video

torch.cuda.set_device(0)
model_dtype, torch_dtype = 'bf16', torch.bfloat16   # استفاده از bf16

model = PyramidDiTForVideoGeneration(
    'PATH',                                         # مسیر چک‌پوینت دانلود شده
    model_dtype,
    model_variant='diffusion_transformer_768p',     # برای ویدیوهای 768p
)

model.vae.to("cuda")
model.dit.to("cuda")
model.text_encoder.to("cuda")
model.vae.enable_tiling()
```

سپس، می‌توانید تولید ویدیو از متن را امتحان کنید:

```python
prompt = "A movie trailer featuring the adventures of the 30 year old space man wearing a red wool knitted motorcycle helmet, blue sky, salt desert, cinematic style, shot on 35mm film, vivid colors"

with torch.no_grad(), torch.cuda.amp.autocast(enabled=True, dtype=torch_dtype):
    frames = model.generate(
        prompt=prompt,
        num_inference_steps=[20, 20, 20],
        video_num_inference_steps=[10, 10, 10],
        height=768,     
        width=1280,
        temp=16,                    
        guidance_scale=9.0,         
        video_guidance_scale=5.0,   
        output_type="pil",
        save_memory=True,           
    )

export_to_video(frames, "./text_to_video_sample.mp4", fps=24)
```

### تولید تصویر به ویدیو:
مدل همچنین از تولید ویدیو بر اساس تصویر پشتیبانی می‌کند:

```python
image = Image.open('assets/the_great_wall.jpg').convert("RGB").resize((1280, 768))
prompt = "FPV flying over the Great Wall"

with torch.no_grad(), torch.cuda.amp.autocast(enabled=True, dtype=torch_dtype):
    frames = model.generate_i2v(
        prompt=prompt,
        input_image=image,
        num_inference_steps=[10, 10, 10],
        temp=16,
        video_guidance_scale=4.0,
        output_type="pil",
        save_memory=True,           
    )

export_to_video(frames, "./image_to_video_sample.mp4", fps=24)
```

### نکات استفاده:
- پارامتر **guidance_scale** کنترل کننده کیفیت بصری است. برای تولید ویدیو با چک‌پوینت 768p پیشنهاد می‌شود بین 7 تا 9 تنظیم شود.
- **video_guidance_scale** کنترل کننده حرکت ویدیو است؛ مقادیر بزرگتر دینامیک بیشتر و مقادیر کوچکتر پایداری بیشتری به ویدیو می‌دهند.

### تقدیر:
تشکر ویژه از پروژه‌های عالی مثل **SD3 Medium** و **Flux 1.0** برای مدل‌های تولید تصویر و ویدیو بر اساس **Flow Matching**.

---
**تاریخ**: 2024-10-21  
**خلاصه**: ترجمه و خلاصه‌ی مدل **Pyramid Flow**  
**تعداد خطوط**: 48  
**تعداد کاراکترها**: 1813  
```bash
nvim Pyramid_Flow_Model_Farsi_Summary.md
```  
**تاریخ**: 2024-10-21

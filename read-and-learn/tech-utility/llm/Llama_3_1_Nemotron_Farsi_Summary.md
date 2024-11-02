### ترجمه و خلاصه:

**مدل Llama-3.1-Nemotron-70B-Instruct** توسط NVIDIA سفارشی شده است تا بهبودهایی در کمک به پاسخ‌های تولیدی مدل‌های زبان بزرگ (LLM) ایجاد کند.

این مدل به امتیازات زیر در ارزیابی‌ها دست یافته است:
- Arena Hard: امتیاز 85.0
- AlpacaEval 2 LC: امتیاز 57.6
- GPT-4-Turbo MT-Bench: امتیاز 8.98

این مدل در تاریخ 1 اکتبر 2024، در سه معیار ارزیابی خودکار رتبه اول را دارد و از مدل‌های قوی دیگر مانند GPT-4o و Claude 3.5 Sonnet پیشی گرفته است. برای آموزش این مدل از روش تقویت با بازخورد انسانی (RLHF) و استفاده از مدل‌های کمکی مانند HelpSteer2 استفاده شده است.

این مدل به HuggingFace Transformers منتقل شده و از سخت‌افزارهای NVIDIA مانند Ampere و Turing پشتیبانی می‌کند. همچنین، با استفاده از API سازگار با OpenAI می‌توان به صورت رایگان از این مدل استفاده کرد. مدل توانایی پاسخ به سوالات عمومی را بدون نیاز به تقویت‌های خاص دارد، ولی برای حوزه‌های تخصصی بهینه‌سازی نشده است.

### پارامترهای ورودی و خروجی:
- ورودی: رشته‌های متنی تا حداکثر 128 هزار توکن
- خروجی: رشته‌های متنی با حداکثر 4 هزار توکن

### سازگاری سخت‌افزاری:
- NVIDIA Ampere
- NVIDIA Hopper
- NVIDIA Turing

### ارزیابی و متدولوژی:
- استفاده از REINFORCE در NeMo Aligner
- جمع‌آوری داده‌ها به صورت ترکیبی از منابع انسانی و مصنوعی

### کد نمونه برای استفاده:
```python
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
model_name = "nvidia/Llama-3.1-Nemotron-70B-Instruct-HF"
model = AutoModelForCausalLM.from_pretrained(model_name, torch_dtype=torch.bfloat16, device_map="auto")
tokenizer = AutoTokenizer.from_pretrained(model_name)

prompt = "How many r in strawberry?"
messages = [{"role": "user", "content": prompt}]

tokenized_message = tokenizer.apply_chat_template(messages, tokenize=True, add_generation_prompt=True, return_tensors="pt", return_dict=True)
response_token_ids = model.generate(tokenized_message['input_ids'].cuda(),attention_mask=tokenized_message['attention_mask'].cuda(),  max_new_tokens=4096, pad_token_id = tokenizer.eos_token_id)
generated_tokens =response_token_ids[:, len(tokenized_message['input_ids'][0]):]
generated_text = tokenizer.batch_decode(generated_tokens, skip_special_tokens=True)[0]
print(generated_text)
```

### لینک‌های مرتبط:
- NeMo Aligner
- HelpSteer2
- مدل Llama 3.1 در سایت Meta

---
**تاریخ**: 2024-10-21  
**خلاصه**: ترجمه و خلاصه ویژگی‌های مدل Llama-3.1-Nemotron-70B-Instruct  
**تعداد خطوط**: 39  
**تعداد کاراکترها**: 1935  
```bash
nvim Llama_3_1_Nemotron_Farsi_Summary.md
```  
**تاریخ**: 2024-10-21

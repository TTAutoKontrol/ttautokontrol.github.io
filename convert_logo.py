import fitz
import os
import shutil

try:
    # Користи целосни патеки
    current_dir = os.path.dirname(os.path.abspath(__file__))
    pdf_path = os.path.join(current_dir, 'images', 'LOGO.pdf')
    
    print(f"Се обидувам да го отворам: {pdf_path}")
    
    # Провери дали постои PDF фајлот
    if not os.path.exists(pdf_path):
        print(f"Грешка: Фајлот {pdf_path} не постои!")
        exit(1)

    # Отвори го PDF-от
    pdf_document = fitz.open(pdf_path)
    print("PDF-от е успешно отворен")
    
    # Земи ја првата страница
    first_page = pdf_document[0]
    print("Првата страница е земена")
    
    # Конвертирај ја во PNG со висока резолуција
    pix = first_page.get_pixmap(matrix=fitz.Matrix(300/72, 300/72))
    print("Страницата е конвертирана во слика")
    
    # Прво зачувај во главниот директориум
    temp_output = os.path.join(current_dir, 'temp_logo.png')
    pix.save(temp_output)
    print(f"Привремено зачувано во: {temp_output}")
    
    # Осигурај се дека images директориумот постои
    output_dir = os.path.join(current_dir, 'images')
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    # Премести го во images директориумот
    final_output = os.path.join(output_dir, 'logo.png')
    shutil.move(temp_output, final_output)
    
    # Провери дали фајлот е успешно креиран
    if os.path.exists(final_output):
        print(f"Логото е успешно конвертирано во PNG формат! Зачувано во: {final_output}")
    else:
        print("Грешка: PNG фајлот не беше креиран!")
    
    # Затвори го PDF-от
    pdf_document.close()

except Exception as e:
    print(f"Се случи грешка: {str(e)}")
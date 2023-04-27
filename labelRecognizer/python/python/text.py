from subprocess import Popen, PIPE
from keywords import Keywords
import os


# No luck with pytesseract or python3-tesseract,
# now just calling it from the shell
def apply_tesseract(im_path, demo=False):
    """
    Calls Tesseract on the image at im_path.
    Returns the text output.
    """
    print(im_path)
    temp_file = "temp"
    p = Popen([
        "tesseract",
        im_path,
        temp_file,
        'nutrition_label'],
        stdout=PIPE, stderr=PIPE)
    output, err = p.communicate()
    temp_file += ".txt"
    output = open(temp_file).read()
    os.remove(temp_file)

    # Print debugging information
    TESSDIR = "TESSERACT"
    if demo:
        TESSDIR = "demo"
    debug_filename = "tess_" + os.path.basename(im_path).\
        lower().replace('.jpg', '.txt').replace('tmp_', '')
    debug_file = open(os.path.join(TESSDIR, debug_filename), 'w')
    debug_file.write(output)

    return output


def create_tess_patterns(filename='eng.label-patterns'):
    patterns = []
    patterns.append('Calories *\d\d*')

    std_line_keywords = [Keywords.label[k] for k in Keywords.label]
    std_line_keywords.append('Cholesterol')
    std_line_keywords.append('Sodium')
    std_line_keywords.append('Potassium')
    std_line_keywords.append('Dietary Fiber')
    std_line_keywords.append('Sugars')
    std_line_ending_patterns = [
        ' *\d\d*g *\d\d*%',
        ' *\d\d*g',
        ' *\d\d*mg *\d\d*%',
        ' *\d\d*mg',
        ' *\d\d*.\d\d*g *\d\d*%',
        ' *\d\d*.\d\d*g',
        ' *\d\d*.\d\d*mg *\d\d*%',
        ' *\d\d*.\d\d*mg'
    ]

    for k in std_line_keywords:
        for ending in std_line_ending_patterns:
            patterns.append(k + ending)

    outfile = open(filename, 'w')
    for p in patterns:
        outfile.write(p + '\n')

#    bottom_area_keywords = [
#        'Vitamin A',
#        'Vitamin C',
#        'Vitamin D',
#        'Calcium',
#        'Iron'
#    ]

import pdfkit

css = ['index.css']

pdfkit.from_file('two.html', 'second_part.pdf', css=css)


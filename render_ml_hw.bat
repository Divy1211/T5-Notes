set a=%cd%
cd docs/courses/ml/hw/hw%1/
pandoc -f markdown-implicit_figures hw%1.md -o hw%1.pdf --toc --toc-depth=3
cd %a%
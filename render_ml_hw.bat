set a=%cd%
cd docs/courses/ml/hw/%1/
pandoc %1.md -o %1.pdf --toc
cd %a%
from numpy import random
import matplotlib.pyplot as plt
import seaborn as sns

x = random.zipf(a=2, size=100)
print(x.sort()) 
sns.displot(x[x<10], kde=False)

plt.show()
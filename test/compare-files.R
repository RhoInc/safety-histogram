library(dplyr)
setwd('/Users/jeremy/sites/github/safety-histogram/test/') #update for your path

kolmogorov_smirnov_js <- read.csv('kolmogorov-smirnov-two-sample-test-js.csv') %>%
  mutate(statistic=round(statistic,4)) %>%
  mutate(p.value=round(p.value,4))

kolmogorov_smirnov_r <- read.csv('kolmogorov-smirnov-two-sample-test.csv') %>% 
  mutate(statistic=round(statistic,4)) %>%
  mutate(p.value=round(p.value,4))

shapiro_wilk_js <- read.csv('shapiro-wilk-normality-test-js.csv') %>%
  mutate(statistic=round(statistic,4)) %>%
  mutate(p.value=round(p.value,4))

shapiro_wilk_r <- read.csv('shapiro-wilk-normality-test.csv') %>%
  mutate(statistic=round(statistic,4)) %>%
  mutate(p.value=round(p.value,4))

sink('compare-files.txt')
print('###########################################################')
print('#### Comparison of kolmogorov smirnov between js and R ####')
print('###########################################################')
summary(comparedf(kolmogorov_smirnov_js,kolmogorov_smirnov_r))

print('###########################################################')
print('#### Comparison of shapiro wilk between js and R       ####')
print('###########################################################')
summary(comparedf(shapiro_wilk_r,shapiro_wilk_js))
sink()

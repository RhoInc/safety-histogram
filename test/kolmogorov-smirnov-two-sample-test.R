library(magrittr)
library(data.table)
library(tidyr)
library(dplyr)
library(arsenal)

# read in raw data
if (!exists('data'))
    data <- 'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/renderer-specific/adbds.csv' %>%
        fread(
            sep = ','
        )

# run Kolmogorov-Smirnov two sample test on each test-groupVariable-groupValue combination
r_output <- data %>%
    filter(
        !is.na(STRESN)
    ) %>%
    select(TEST, STRESN, SITE, SEX, RACE, ARM) %>%
    pivot_longer(
        -c(TEST, STRESN), names_to = 'group', values_to = 'value'
    ) %>%
    group_by(TEST, group, value) %>%
    summarize(
        n = n(),
        statistic = round(ks.test(STRESN, data %>% rename(test = TEST) %>% filter(test == TEST) %>% pull(STRESN))$statistic, 4),
        p.value = round(ks.test(STRESN, data %>% rename(test = TEST) %>% filter(test == TEST) %>% pull(STRESN))$p.value, 4)
    ) %>%
    ungroup %>%
    arrange(TEST, group, value)

# read in .js output
js_output <- 'kolmogorov-smirnov-two-sample-test.csv' %>%
    fread(
        sep = ','
    ) %>%
    mutate(
        statistic = round(statistic, 4),
        p.value = round(p.value, 4)
    )

# direct output of comparison of test results to text file
con <- file('kolmogorov-smirnov-two-sample-test-comparison.txt')
sink(con)
sink(con, type = 'message')

    print('----------------------------------------------------------------------------------------------------')
    print('  Comparison of Kolmogorov-Smirnov tests between JavaScript and R')
    print('----------------------------------------------------------------------------------------------------')

    # run comparison
    comparison <- comparedf(
        r_output,
        js_output
    )
    print(summary(comparison))

    # redirect output to console
sink()
sink(type = 'message')

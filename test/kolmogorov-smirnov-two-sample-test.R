library(magrittr)
library(data.table)
library(tidyr)
library(dplyr)

data <- 'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/renderer-specific/adbds.csv' %>%
    fread(
        sep = ','
    )

summarized <- data %>%
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
        statistic = ks.test(STRESN, data %>% rename(test = TEST) %>% filter(test == TEST) %>% pull(STRESN))$statistic,
        p.value = ks.test(STRESN, data %>% rename(test = TEST) %>% filter(test == TEST) %>% pull(STRESN))$p.value
    ) %>%
    ungroup

summarized %>%
    fwrite(
        './kolmogorov-smirnov-two-sample-test.csv',
        row.names = FALSE
    )
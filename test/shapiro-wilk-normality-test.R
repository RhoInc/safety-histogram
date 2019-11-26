# TODO: compare R output with JavaScript output

library(magrittr)
library(data.table)
library(dplyr)

data <- 'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/renderer-specific/adbds.csv' %>%
    fread(
        sep = ','
    )

summarized <- data %>%
    filter(
        !is.na(STRESN)
    ) %>%
    select(TEST, STRESN) %>%
    group_by(TEST) %>%
    summarize(
        n = n(),
        statistic = shapiro.test(STRESN)$statistic,
        p.value = shapiro.test(STRESN)$p.value
    ) %>%
    ungroup

summarized %>%
    fwrite(
        './shapiro-wilk-normality-test.csv',
        row.names = FALSE
    )

library(magrittr)
library(data.table)
library(dplyr)
library(arsenal)

# read in raw data
if (!exists('data'))
    data <- 'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/renderer-specific/adbds.csv' %>%
        fread(
            sep = ','
        )

# run Shapiro-Wilk normality test for each test
r_output <- data %>%
    filter(
        !is.na(STRESN)
    ) %>%
    select(TEST, STRESN) %>%
    group_by(TEST) %>%
    summarize(
        n = n(),
        statistic = round(shapiro.test(STRESN)$statistic, 4),
        p.value = round(shapiro.test(STRESN)$p.value, 4)
    ) %>%
    ungroup %>%
    arrange(TEST)


# read in .js output
js_output <- 'shapiro-wilk-normality-test.csv' %>%
    fread(
        sep = ','
    ) %>%
    mutate(
        statistic = round(statistic, 4),
        p.value = round(p.value, 4)
    )

# direct output of comparison of test results to text file
con <- file('shapiro-wilk-normality-test-comparison.txt')
sink(con)
sink(con, type = 'message')

    print('----------------------------------------------------------------------------------------------------')
    print('  Comparison of Shapiro-Wilk tests between JavaScript and R')
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

library(dplyr)

index <- 6

sshist <- function(x){
    N <- 2: 100
    C <- numeric(length(N))
    D <- C
    
    for (i in 1:length(N)) {
        D[i] <- diff(range(x))/N[i]
        
        edges = seq(min(x),max(x),length=N[i])
        hp <- hist(x, breaks = edges, plot = FALSE)
        ki <- hp$counts
        
        k <- mean(ki)
        v <- sum((ki-k)^2)/N[i]

        C[i] <- (2*k-v)/D[i]^2 # cost function
        
        if (i == index) {
            print(paste0('nBins: ', N[i]), quote = FALSE)
            print(paste0('binWidths: ', D[i]), quote = FALSE)
            print(paste0('binBoundaries: ', paste(edges, collapse = ',')), quote = FALSE)
            print(paste0('histOutput: ', hp), quote = FALSE)
            print(paste0('binSizes: ', paste(ki, collapse = ',')), quote = FALSE)
            print(paste0('meanBinSizes: ', k), quote = FALSE)
            print(paste0('residuals: ', v), quote = FALSE)
            print(paste0('cost: ', C[i]), quote = FALSE)
        }
    }

    idx <- which.min(C)
    optD <- D[idx]
    optN <- N[idx]
    print(optN)

    edges <- seq(min(x),max(x),length=optN)
    h = hist(x, breaks = edges)
    rug(x)
    
    return(h)
}

#adbds <- 'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/renderer-specific/adbds.csv' %>%
#    read.csv(
#        na.strings = ' ',
#        colClasses = 'character'
#    ) %>%
#    filter(STRESN != '') %>%
#    mutate(STRESN = as.numeric(STRESN))
albumin <- adbds %>%
    filter(TEST == 'Albumin')
sshist(albumin$STRESN)
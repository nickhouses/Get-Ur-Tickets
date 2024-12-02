#!/usr/bin/env python3

import os
from processing import get_total_price_from_api

TEAMS_DIRECTORY = './teams/'


def cacheSearches():
    for filename in os.listdir(TEAMS_DIRECTORY):
        with open(TEAMS_DIRECTORY + filename, 'r') as sport:
            line = sport.readline().replace('\n', '')
            while line:
                get_total_price_from_api('LAS', line)
                line = sport.readline().replace('\n', '')


if __name__ == "__main__":
    cacheSearches()

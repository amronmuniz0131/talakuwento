export interface QuizQuestion {
    question: string;
    choices: string[];
    correctAnswer: number; // index 0-2
}

export interface StoryQuiz {
    storyId: string;
    questions: QuizQuestion[];
}

export const quizData: StoryQuiz[] = [
    {
        storyId: 'maria-makiling',
        questions: [
            {
                question: 'Sino ang pangunahing tauhan sa alamat?',
                choices: [
                    'Maria Makiling',
                    'Juan Tamad',
                    'Bernardo Carpio'
                ],
                correctAnswer: 0
            },
            {
                question: 'Saan nakatira si Maria Makiling?',
                choices: [
                    'Bundok Makiling',
                    'Dagat',
                    'Lawa'
                ],
                correctAnswer: 0
            },
            {
                question: 'Ano ang uri ng akda nito?',
                choices: [
                    'Pabula',
                    'Epiko',
                    'Alamat'
                ],
                correctAnswer: 2
            },
            {
                question: 'Kilala si Maria Makiling bilang ano?',
                choices: [
                    'Diwata',
                    'Prinsesa',
                    'Reyna'
                ],
                correctAnswer: 0
            },
            {
                question: 'Ano ang madalas niyang gawin?',
                choices: [
                    'Magnakwa',
                    'Tumulong sa mga tao',
                    'Mang away'
                ],
                correctAnswer: 1
            },
            {
                question: 'Ano ang aral ng alamat?',
                choices: [
                    'Maging tamad',
                    'Maging makasarili',
                    'Maging mabuti'
                ],
                correctAnswer: 2
            }
        ]
    },
    {
        storyId: 'bantugan',
        questions: [
            {
                question: 'Anong uri ng akda ang Bantugan?',
                choices: [
                    'Alamat',
                    'Epiko',
                    'Pabula'
                ],
                correctAnswer: 1
            },
            {
                question: 'Sino ang pangunahing tauhan?',
                choices: [
                    'Bantugan',
                    'Lam-ang',
                    'Sulayman'
                ],
                correctAnswer: 0
            },
            {
                question: 'Ano ang uri ng akda nito?',
                choices: [
                    'Alamat',
                    'Epiko',
                    'Pabula'
                ],
                correctAnswer: 1
            },
            {
                question: 'Ano si Bantugan?',
                choices: [
                    'Hari',
                    'Bayani',
                    'Magsasaka'
                ],
                correctAnswer: 0
            },
            {
                question: 'Saan nagmula ang kuwento?',
                choices: [
                    'Maranao',
                    'Tagalog',
                    'Ilokanio'
                ],
                correctAnswer: 0
            },
            {
                question: 'Ano ang katangian ni Bantugan?',
                choices: [
                    'Duwag',
                    'Matapang',
                    'Tamad'
                ],
                correctAnswer: 1
            }
        ]
    },
    {
        storyId: 'palaka-kalabaw',
        questions: [
            {
                question: 'Sino ang gustong gumaya sa kalabaw?',
                choices: [
                    'Kalabaw',
                    'Palaka',
                    'Kabayo'
                ],
                correctAnswer: 1
            },
            {
                question: 'Sino ang malaking hayop sa kuwento?',
                choices: [
                    'Kalabaw',
                    'Palaka',
                    'Aso'
                ],
                correctAnswer: 0
            },
            {
                question: 'Ano ang uri ng akda nito?',
                choices: [
                    'Alamat',
                    'Pabula',
                    'Epiko'
                ],
                correctAnswer: 1
            },
            {
                question: 'Ano ang ginawa ng palaka?',
                choices: [
                    'Tumakbo',
                    'Nagpalaki ng tiyan',
                    'Lumipad'
                ],
                correctAnswer: 1
            },
            {
                question: 'Ano ang nangyari sa palaka?',
                choices: [
                    'Nanalo',
                    'Pumutok',
                    'Lumaki'
                ],
                correctAnswer: 1
            },
            {
                question: 'Ano ang aral ng kuwento?',
                choices: [
                    'Maging mayabang',
                    'Huwag mainggit',
                    'Maging tamad'
                ],
                correctAnswer: 1
            }
        ]
    },
    {
        storyId: 'lawa-ng-bulusan',
        questions: [
            {
                question: 'Ano ang pinagmulan sa alamat na ito?',
                choices: [
                    'Lawa',
                    'Ilong',
                    'Bundok'
                ],
                correctAnswer: 0
            },
            {
                question: 'Saan matatagpuan ang Bulusan?',
                choices: [
                    'Sorsogon',
                    'Cebu',
                    'Bohol'
                ],
                correctAnswer: 0
            },
            {
                question: 'Ano ang uri ng akda nito?',
                choices: [
                    'Pabula',
                    'Alamat',
                    'Epiko'
                ],
                correctAnswer: 1
            },
            {
                question: 'Ano ang ipinaliliwanag ng alamat?',
                choices: [
                    'Pinagmulan ng lawa',
                    'Pinagmulan ng bahay',
                    'Pinagmulan ng ibon'
                ],
                correctAnswer: 0
            },
            {
                question: 'Ano ang madalas laman ng alamat?',
                choices: [
                    'Katatawanan',
                    'Kababalaghan',
                    'Balita'
                ],
                correctAnswer: 1
            },
            {
                question: 'Ano ang aral ng kuwento?',
                choices: [
                    'Magtapon ng basura',
                    'Pahalagahan ang kalikasan',
                    'Sirain ang kalikasan'
                ],
                correctAnswer: 1
            }
        ]
    },
    {
        storyId: 'indarapatra-sulayman',
        questions: [
            {
                question: 'Sino ang magkatuwang na bayani sa epiko?',
                choices: [
                    'Indarapatra at Sulayman',
                    'Maria at Jose',
                    'Bantugan at Handiong'
                ],
                correctAnswer: 0
            },
            {
                question: 'Ano ang uri ng akda nito?',
                choices: [
                    'Alamat',
                    'Epiko',
                    'Pabula'
                ],
                correctAnswer: 1
            },
            {
                question: 'Ano ang ginawa nila?',
                choices: [
                    'Natulog',
                    'Lumaban sa halimaw',
                    'Naglaro'
                ],
                correctAnswer: 1
            },
            {
                question: 'Sino ang matapang na bayani?',
                choices: [
                    'Sulayman',
                    'Pagong',
                    'Kalabaw'
                ],
                correctAnswer: 0
            },
            {
                question: 'Ano ang tema ng kuwento?',
                choices: [
                    'Inggit',
                    'Kabayanihan',
                    'Katamaran'
                ],
                correctAnswer: 1
            },
            {
                question: 'Ano ang aral ng epiko?',
                choices: [
                    'Mag-away',
                    'Magtulungan',
                    'Maging duwag'
                ],
                correctAnswer: 1
            }
        ]
    },
    {
        storyId: 'ibig-maging-tenor',
        questions: [
            {
                question: 'Ano ang gustong maging ng tauhan sa kuwento?',
                choices: [
                    'Tenor',
                    'Doktor',
                    'Guro'
                ],
                correctAnswer: 0
            },
            {
                question: 'Ano ang tenor?',
                choices: [
                    'Magsasaka',
                    'Mang-aawit',
                    'Sundalo'
                ],
                correctAnswer: 1
            },
            {
                question: 'Ano ang nais patunayan ng tauhan?',
                choices: [
                    'Kaya niyang lumipad',
                    'Kaya niyang umawit',
                    'Kaya niyang tumakbo'
                ],
                correctAnswer: 1
            },
            {
                question: 'Ano ang uri ng akda nito?',
                choices: [
                    'Epiko',
                    'Pabula',
                    'Alamat'
                ],
                correctAnswer: 1
            },
            {
                question: 'Ano ang karaniwang tauhan sa pabula?',
                choices: [
                    'Hayop',
                    'Bayani',
                    'Hari'
                ],
                correctAnswer: 0
            },
            {
                question: 'Ano ang aral ng kuwento?',
                choices: [
                    'Magyabang palagi',
                    'Kilalanin ang sarili',
                    'Maging tamad'
                ],
                correctAnswer: 1
            }
        ]
    },
    {
        storyId: 'makahiya',
        questions: [
            {
                question: 'Ano ang uri ng akda nito?',
                choices: [
                    'Alamat',
                    'Pabula',
                    'Epiko'
                ],
                correctAnswer: 0
            },
            {
                question: 'Ano ang paksa ng kuwento?',
                choices: [
                    'Halamang Makahiya',
                    'Bundok',
                    'Ilog'
                ],
                correctAnswer: 1
            },
            {
                question: 'Bakit tinawag na makahiya ang halaman?',
                choices: [
                    'Matapang',
                    'Nahihiya kapag hinahawakan',
                    'Malaki'
                ],
                correctAnswer: 1
            },
            {
                question: 'Ano ang nangyayari sa dahon ng makahiya kapag nahawakan?',
                choices: [
                    'Nagtitiklop',
                    'Nalalagas',
                    'Lumalaki'
                ],
                correctAnswer: 0
            },
            {
                question: 'Ano ang karaniwang aral ng alamat?',
                choices: [
                    'Katamaran',
                    'Magandang asal at kahinhinan',
                    'Kasamaan'
                ],
                correctAnswer: 1
            },
            {
                question: 'Ano ang ipinaliliwanag ng alamat?',
                choices: [
                    'Pinagmulan ng halaman',
                    'Pinagmulan ng bundok',
                    'Pinagmulan ng dagat'
                ],
                correctAnswer: 0
            }
        ]
    },
    {
        storyId: 'ibalon',
        questions: [
            {
                question: 'Anong uri ng akda ang Ibalon?',
                choices: [
                    'Dula',
                    'Alamat',
                    'A Epiko'
                ],
                correctAnswer: 2
            },
            {
                question: 'Saan nagmula ang Ibalon?',
                choices: [
                    'Ilocos',
                    'Bicol',
                    'Pangasinan'
                ],
                correctAnswer: 1
            },
            {
                question: 'Sino ang bayani sa Ibalon?',
                choices: [
                    'Handiong',
                    'Pagong',
                    'Palaka'
                ],
                correctAnswer: 0
            },
            {
                question: 'Ano ang tema ng epiko?',
                choices: [
                    'Katamaran',
                    'Kabayanihan',
                    'Inggit'
                ],
                correctAnswer: 1
            },
            {
                question: 'Ano ang katangian ng bayani?',
                choices: [
                    'Mahina',
                    'Matapang',
                    'Tamad'
                ],
                correctAnswer: 1
            },
            {
                question: 'Ano ang aral ng kuwento?',
                choices: [
                    'Maging matatag',
                    'Sumuko agad',
                    'Maging duwag'
                ],
                correctAnswer: 0
            }
        ]
    },
    {
        storyId: 'masamang-kalahi',
        questions: [
            {
                question: 'Anong uri ng akda ang Masamang Kalahi?',
                choices: [
                    'Nobela',
                    'Pabula',
                    'Tula'
                ],
                correctAnswer: 1
            },
            {
                question: 'Sino ang karaniwang tauhan sa pabula?',
                choices: [
                    'Hayop',
                    'Halaman',
                    'Tao lamang'
                ],
                correctAnswer: 0
            },
            {
                question: 'Ano ang ipinapakita sa pamagat?',
                choices: [
                    'Mabuting asal',
                    'Masamang ugali',
                    'Katapangan'
                ],
                correctAnswer: 1
            },
            {
                question: 'Ano ang layunin ng pabula?',
                choices: [
                    'Magturo ng aral',
                    'Magpatawa lang',
                    'Magbigay ng balita'
                ],
                correctAnswer: 0
            },
            {
                question: 'Ano ang dapat iwasan?',
                choices: [
                    'Kabaitan',
                    'Masamang asal',
                    'Paggalang'
                ],
                correctAnswer: 1
            },
            {
                question: 'Ano ang aral ng kuwento?',
                choices: [
                    'Maging masama',
                    'Maging mabuti',
                    'Maging tamad'
                ],
                correctAnswer: 1
            }
        ]
    }
];

export const getQuizForStory = (storyId: string): StoryQuiz | undefined => {
    return quizData.find(quiz => quiz.storyId === storyId);
};

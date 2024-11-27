let map;
        let currentScore = 0;
        let targetCountry = '';
        let difficulty = 'normal';
        let geojsonLayer;
        let gameTimer;
        let timeLeft;
        let isGameActive = false;
        let usedCountries = new Set();
        let availableCountries = [];
        let gameMode = 'time';
        let foundCountries = new Set();
        let correctAttempts = 0;
        let incorrectAttempts = 0;
        let alphabeticIndex = 0;
        let sortedCountries = [];
        let currentStreak = 0;
        let bestStreak = 0;
        
        const countries = {
            easy: [
        'United States of America', 'Canada', 'Brazil', 'Russia', 'China',
        'India', 'Australia', 'South Africa', 'Egypt', 'France', 'United Kingdom',
        'Italy', 'Germany', 'Japan', 'Spain', 'Mexico', 'Argentina', 'Saudi Arabia',
        'Turkey', 'South Korea', 'Austria', 'Belgium', 'Switzerland', 'Ireland',
        'Portugal', 'Greece', 'Sweden', 'Netherlands', 'Denmark', 'New Zealand',
        'Norway', 'Poland', 'Azerbaijan','Thailand', 'Vietnam', 'Indonesia', 'Pakistan'
    ],
    normal: [
        'Ukraine', 'Cuba', 'Venezuela', 'Colombia', 'Malaysia', 'Myanmar', 
        'Iraq', 'Chile', 'Kazakhstan', 'Romania', 'Peru', 'Morocco', 'Algeria', 
        'Ethiopia', 'Kenya', 'Afghanistan', 'Armenia', 'Belarus', 'Bolivia', 
        'Bosnia and Herzegovina', 'Botswana', 'Bulgaria', 'Croatia', 'Georgia', 
        'Hungary', 'Jordan', 'Lebanon', 'Lithuania', 'Madagascar', 'Moldova', 
        'Serbia', 'Slovakia', 'Slovenia', 'Tanzania', 'Uganda', 'Uzbekistan', 
        'Zambia', 'Zimbabwe', 'Malawi', 'Rwanda', 'Paraguay', 'Eswatini', 
        'Mozambique', 'Bangladesh', 'Philippines', 'South Sudan'
    ],
    hard: [
        'Uruguay', 'Tunisia', 'Cambodia', 'Laos', 'Nepal', 'Mongolia', 
        'Qatar', 'Kuwait', 'Bahrain', 'Bhutan', 'Brunei', 
        'Djibouti', 'Burundi', 'Saint Kitts and Nevis', 'Dominica', 
        'Saint Lucia', 'Grenada', 'Barbados', 'Antigua and Barbuda', 
        'Malta', 'Liechtenstein', 'Andorra', 'Monaco', 'San Marino', 
        'Benin', 'Cape Verde', 'Chad', 'Equatorial Guinea', 
        'Eritrea', 'Gabon', 'Gambia', 'Guinea', 'Guinea-Bissau', 
        'Kosovo', 'Liberia', 'Maldives', 'Mauritania', 
        'Mauritius', 'Namibia', 'Papua New Guinea', 'Solomon Islands', 
        'Suriname', 'Tajikistan', 'Togo', 
        'Trinidad and Tobago', 'Turkmenistan', 'Vanuatu', 'Lesotho', 
        'Eswatini'
    ],
    ultra: [
        'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda',
        'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain',
        'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
        'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria',
        'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada',
        'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia',
        'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic',
        'Democratic Republic of the Congo', 'Denmark', 'Djibouti', 'Dominica',
        'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea',
        'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Finland', 'France',
        'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada',
        'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras',
        'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland',
        'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya',
        'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho',
        'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar',
        'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta',
        'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco',
        'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia',
         'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger',
        'Nigeria', 'North Korea', 'Macedonia', 'Norway', 'Oman', 'Pakistan',
         'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru',
        'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda',
        'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines',
        'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal',
        'Serbia', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia',
        'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan',
        'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria',
        'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo',
        'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu',
        'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 
        'United States of America', 'Uruguay', 'Uzbekistan', 'Vanuatu',
        'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
    ]
        };

        const difficultyZoom = {
            easy: 2,
            normal: 3,
            hard: 3,
            ultra: 2
        };

        const errorMessages = [
            "Bruh... That ain't it! 🤦‍♂️",
            "Task failed successfully! 😅",
            "Nope! Keep trying bestie! 💅",
            "Emotional Damage! Wrong answer! 😭",
            "Geography has left the chat ❌",
            "404: Correct Answer Not Found 🔍",
            "Plot twist: That's the wrong country! 🌪️",
            "Oof! Not even close! 🙈",
            "Mission failed, we'll get 'em next time! 🎮",
            "Wrong answers only challenge? 🤔",
            "Close... but not close enough! 🌍",  
            "Oops, you just invented a new country! 🗺️",  
            "Try again, cartographer-in-training! 🧭",  
            "Geography gods are not impressed. 😔",  
            "That's not even in the same hemisphere! 🌐",  
            "If guessing was a sport, you'd be benched! 🏀",  
            "Nope. But hey, points for confidence! 👍",  
            "Almost... just kidding, not even close! 😂",  
            "Looks like your compass is broken! 🧭",  
            "Wrong! But your effort is... noticeable! 🤔",  
            "You're making the map blush! 😳",  
            "History books won't remember this guess. 📖",  
            "Did you just close your eyes and pick one? 🎯",  
            "Somewhere in another timeline, thats right! 🕰️",  
            "Try harder, globe trotter! 🌎" 
        ];

        const successMessages = [
            "Let's gooooo! 🚀",
            "Geography Master has entered the chat! 🎓",
            "You're just built different! 💪",
            "Absolutely cracked at geography! 🔥",
            "W rizz on the geography game! 👑",
            "No cap, that's correct! 🎯",
            "Sheeeesh! You nailed it! ✨",
            "Main character energy right there! 🌟",
            "Certified geography moment! 📍",
            "You dropped this 👑",
            "Youre on fire! 🔥",  
            "World traveler vibes! ✈️",  
            "You ate that map up! 🗺️✨",  
            "Big brain energy right here! 🧠💡",  
            "Thats a dub for the geography squad! 🏆",  
            "Geography genius spotted! 👀",  
            "King/Queen of the map! 👑",  
            "Absolutely goated with the globe! 🐐🌍",  
            "Legend behavior unlocked! 💯",  
            "Geography got nothing on you! 😎",  
            "Straight to the point, like a compass! 🧭",  
            "Chefs kiss for that answer! 👌🍴",  
            "World domination starts here! 🌐",  
            "Certified cartographer moment! 📜",  
            "Youre mapping out greatness! 🗺️"  
        ];

        const streakMessages = {
            milestone: [
                "🔥 ON FIRE! STREAK OF",
                "⚡ UNSTOPPABLE! STREAK OF",
                "💫 LEGENDARY! STREAK OF",
                "👑 DOMINATING! STREAK OF",
                "🌟 INCREDIBLE! STREAK OF"
            ],
            gameOver: [
                "Streak Ended! Final Count:",
                "The Streak is Over! You reached:",
                "Amazing Run! Final Streak:",
                "What a Streak! Final Count:",
                "Impressive! Final Streak:"
            ]
        };

        // Update the countryHints with more countries
        const countryHints = {
            'Afghanistan': [
        'Home to the ancient city of Herat',
        'Famous for the Taliban and conflicts in the 21st century',
        'Rugged mountainous terrain, including the Hindu Kush',
        'Famous figures: Ahmad Shah Durrani, Malala Yousafzai'
    ],
    'Albania': [
        'Known for its beautiful coastline on the Adriatic Sea',
        'Famous for the city of Berat, known as the "city of a thousand windows"',
        'Famous figures: Mother Teresa (born in Albania), Enver Hoxha'
    ],
    'Algeria': [
        'The largest country in Africa',
        'Home to the Sahara Desert',
        'Famous figures: Albert Camus, Houari Boumédiene'
    ],
    'Andorra': [
        'A small country nestled in the Pyrenees mountains',
        'Famous for its ski resorts and duty-free shopping',
        'Known for being a co-principality with France and Spain'
    ],
    'Angola': [
        'Famous for its oil reserves',
        'Home to the Angolan Civil War (1975-2002)',
        'Famous figures: Agostinho Neto, Eduardo dos Santos'
    ],
    'Antigua and Barbuda': [
        'Famous for its beautiful beaches and resorts',
        'Home to Nelsons Dockyard, a UNESCO World Heritage site',
        'Known for being a popular cruise ship destination'
    ],
    'Argentina': [
        'Home to the famous tango dance',
        'Famous for its beef, wine, and Patagonia region',
        'Famous figures: Diego Maradona, Lionel Messi, Eva Perón'
    ],
    'Armenia': [
        'One of the worlds first Christian nations',
        'Smallest country in Caucasus, famous for his genocides, and diasporas',
        'Famous figures: Serj Tankian, Hovhannes Shiraz'
    ],
    'Australia': [
        'Famous for the Great Barrier Reef and unique wildlife like kangaroos and koalas',
        'Home to iconic landmarks like the Sydney Opera House and Uluru',
        'Famous figures: Steve Irwin, Cate Blanchett, Hugh Jackman'
    ],
    'Austria': [
        'Known for classical music, particularly composers like Mozart and Beethoven',
        'Famous for skiing in the Alps and the city of Vienna',
        'Famous figures: Wolfgang Amadeus Mozart, Sigmund Freud'
    ],
    'Azerbaijan': [
        'Famous for its rich history in the Caucasus region',
        'Home to the Caspian Sea and beautiful landscapes',
        'Famous figures: Heydar Aliyev, Garry Kasparov, Lotfi A. Zadeh, Teimour Radjabov'
    ],
    'Bahamas': [
        'Famous for its pristine beaches and crystal-clear waters',
        'A popular destination for tourists and cruise ships',
        'Famous figures: Sidney Poitier, Shontelle'
    ],
    'Bahrain': [
        'A small island country in the Persian Gulf',
        'Famous for its Formula 1 Grand Prix',
        'Famous figures: Hamad bin Isa Al Khalifa'
    ],
    'Bangladesh': [
        'Home to the Sundarbans, the largest mangrove forest in the world',
        'Known for its textile industry and vibrant culture',
        'Famous figures: Sheikh Mujibur Rahman, Muhammad Yunus'
    ],
    'Barbados': [
        'Famous for its sugar cane industry and rum production',
        'Home to beautiful beaches and coral reefs',
        'Famous figures: Rihanna, Sir Garfield Sobers'
    ],
    'Belarus': [
        'Known for its rich history of Soviet influence',
        'Home to the Brest Fortress, a symbol of World War II',
        'Famous figures: Svetlana Alexievich, Alexander Lukashenko'
    ],
    'Belgium': [
        'Famous for its chocolates, waffles, and beer',
        'Known for medieval towns, castles, and the city of Brussels',
        'Famous figures: Audrey Hepburn, Jean-Claude Van Damme'
    ],
    'Belize': [
        'Home to the Great Blue Hole, a popular diving destination',
        'Known for its ancient Mayan ruins',
        'Famous figures: Jade McCulloch, George Price'
    ],
    'Benin': [
        'Famous for its history as the birthplace of the voodoo religion',
        'Home to the Royal Palaces of Abomey, a UNESCO World Heritage site',
        'Famous figures: Mathieu Kérékou, Wally Seck'
    ],
    'Bhutan': [
        'Known for its unique measure of happiness called Gross National Happiness',
        'Famous for the Paro Taktsang monastery',
        'Famous figures: Jigme Singye Wangchuck, Tshering Tobgay'
    ],
    'Bolivia': [
        'Home to the Salar de Uyuni, the worlds largest salt flat',
        'Known for its indigenous cultures and political history',
        'Famous figures: Evo Morales, Túpac Katari'
    ],
    'Bosnia and Herzegovina': [
        'Known for its war history during the 1990s',
        'Famous for the old town of Mostar and its iconic bridge',
        'Famous figures: Goran Višnjić, Edin Džeko'
    ],
    'Botswana': [
        'Home to the Okavango Delta, a UNESCO World Heritage site',
        'Famous for its wildlife and safari tourism',
        'Famous figures: Desmond Tutu, Seretse Khama'
    ],
    'Brazil': [
        'Home to the Amazon Rainforest',
        'Famous for Carnival, soccer, and samba music',
        'Famous figures: Pelé, Neymar, Carmen Miranda'
    ],
    'Brunei': [
        'A small, wealthy nation on the island of Borneo',
        'Known for its vast oil reserves and luxury lifestyle',
        'Famous figures: Sultan Hassanal Bolkiah'
    ],
    'Bulgaria': [
        'Known for its ancient ruins, like those in Plovdiv',
        'Famous for its roses, which are used to make rose oil',
        'Famous figures: Hristo Stoichkov, Vasil Levski'
    ],
    'Burkina Faso': [
        'Known for its cultural festivals, like FESPACO (film festival)',
        'Famous for its music scene, including Afrobeat',
        'Famous figures: Thomas Sankara, Rasmane Ouedraogo'
    ],
    'Burundi': [
        'Famous for its mountainous terrain and Lake Tanganyika',
        'Known for its tea and coffee industries',
        'Famous figures: Pierre Nkurunziza, Melchior Ndadaye'
    ],
    'Cabo Verde': [
        'An archipelago off the coast of West Africa',
        'Known for its Creole culture and music, especially morna',
        'Famous figures: Cesária Évora, Amílcar Cabral'
    ],
    'Cambodia': [
        'Home to the ancient temple complex of Angkor Wat',
        'Known for its tragic history under the Khmer Rouge regime',
        'Famous figures: Pol Pot, Norodom Sihamoni'
    ],
    'Cameroon': [
        'Known for its diverse culture and languages',
        'Home to Mount Cameroon, the highest peak in West Africa',
        'Famous figures: Samuel Etoo, Paul Biya'
    ],
    'Canada': [
        'Known for its natural beauty, including Niagara Falls and the Rocky Mountains',
        'Famous for its multiculturalism and the CN Tower',
        'Famous figures: Justin Trudeau, Celine Dion, Drake'
    ],
    'Central African Republic': [
        'Famous for its wildlife, including the Dzanga-Sangha National Park',
        'Has faced political instability and civil war',
        'Famous figures: François Bozizé, Catherine Samba-Panza'
    ],
    'Chad': [
        'Known for its vast deserts and Lake Chad',
        'Famous for its cultural diversity and wildlife',
        'Famous figures: Idriss Déby, Hissène Habré'
    ],
    'Chile': [
        'Home to the Atacama Desert, one of the driest places on Earth',
        'Known for the Andes mountains and Easter Island',
        'Famous figures: Pablo Neruda, Augusto Pinochet'
    ],
    'China': [
        'Home to the Great Wall of China',
        'The world\'s most populous country',
        'Known for pandas and traditional tea culture',
        'Famous figures: Confucius, Mao Zedong, Jackie Chan'
    ],
    'Colombia': [
        'Known for its coffee and beautiful beaches on both the Pacific and Caribbean coasts',
        'Home to the Andes mountains and the Amazon rainforest',
        'Famous figures: Shakira, Gabriel García Márquez, Juan Gabriel'
    ],
    'Congo': [
        'Home to the Congo River, the second-longest river in Africa',
        'Known for its rainforests and wildlife, including gorillas',
        'Famous figures: Denis Sassou Nguesso, Jean-Pierre Bemba'
    ],
    'Costa Rica': [
        'Known for its biodiversity and eco-tourism',
        'Home to volcanoes and national parks',
        'Famous figures: Óscar Arias, Franklin Chang-Díaz'
    ],
    'Croatia': [
        'Famous for its stunning coastline along the Adriatic Sea',
        'Home to the historic city of Dubrovnik',
        'Famous figures: Nikola Tesla, Marin Čilić'
    ],
    'Cuba': [
        'Known for its revolutionary history and the Cuban Missile Crisis',
        'Famous for its cigars, music (salsa), and vintage cars',
        'Famous figures: Fidel Castro, Che Guevara, Gloria Estefan'
    ],
    'Cyprus': [
        'An island nation in the Mediterranean Sea',
        'Known for its ancient ruins and archaeological sites',
        'Famous figures: Archimedes, Glafcos Clerides'
    ],
    'Czech Republic': [
        'Home to the historic city of Prague, known for its medieval architecture',
        'Famous for its beer and glass-making industry',
        'Famous figures: Václav Havel, Antonín Dvořák'
    ],
    'Democratic Republic of the Congo': [
        'Home to the Congo River and vast rainforests',
        'Known for its mineral resources and historical conflicts',
        'Famous figures: Patrice Lumumba, Joseph Kabila'
    ],
    'Denmark': [
        'Known for its strong welfare state and happiness index',
        'Home to iconic landmarks like the Little Mermaid statue',
        'Famous figures: Hans Christian Andersen, Søren Kierkegaard'
    ],
    'Djibouti': [
        'A small country in the Horn of Africa, known for its strategic location near the Red Sea',
        'Famous for its salt flats and the Lake Assal',
        'Famous figures: Ismaïl Omar Guelleh, Hassan Gouled Aptidon'
    ],
    'Dominica': [
        'An island known for its rainforests and volcanic mountains',
        'Home to the Boiling Lake, the second-largest fumarole in the world',
        'Famous figures: Roosevelt Skerrit, Dominica Jackson'
    ],
    'Dominican Republic': [
        'Famous for its beautiful beaches and all-inclusive resorts',
        'Home to the oldest European cathedral in the Americas, in Santo Domingo',
        'Famous figures: Juan Pablo Duarte, Oscar de la Renta'
    ],
    'Ecuador': [
        'Known for its biodiversity, the Galápagos Islands, and Amazon Rainforest',
        'Home to the Equator line, where the country gets its name',
        'Famous figures: Rafael Correa, Oswaldo Guayasamín'
    ],
    'Egypt': [
        'Famous for its ancient pyramids and Sphinx',
        'The Nile River runs through this country',
        'Home to the ancient Pharaohs',
        'Famous figures: Cleopatra, Tutankhamun, Naguib Mahfouz'
    ],
    'El Salvador': [
        'Known for its volcanic landscape and coffee production',
        'Famous for its beaches and surf spots along the Pacific Ocean',
        'Famous figures: Óscar Romero, Nayib Bukele'
    ],
    'Equatorial Guinea': [
        'An island nation off the coast of Central Africa',
        'Known for its oil reserves and economic wealth',
        'Famous figures: Teodoro Obiang, Francisco Macías Nguema'
    ],
    'Eritrea': [
        'Located in the Horn of Africa, bordering the Red Sea',
        'Known for its history of conflict with Ethiopia',
        'Famous figures: Isaias Afwerki, Haile Selassie'
    ],
    'Estonia': [
        'Known for its advanced digital society and e-residency program',
        'Famous for its medieval old town of Tallinn',
        'Famous figures: Jaan Kross, Arvo Pärt'
    ],
    'Eswatini': [
        'Known for its monarchy and rich cultural traditions',
        'Famous for its national parks and wildlife, including rhinos',
        'Famous figures: King Mswati III'
    ],
    'Ethiopia': [
        'Home to ancient civilizations, including the Kingdom of Aksum',
        'Known for its coffee, which is believed to have originated here',
        'Famous figures: Haile Selassie, Abiy Ahmed'
    ],
    'Finland': [
        'Known for its saunas and Northern Lights',
        'Famous for its education system and high quality of life',
        'Famous figures: Sanna Marin, Jean Sibelius'
    ],
    'France': [
        'Home to iconic landmarks like the Eiffel Tower and the Louvre Museum',
        'Famous for its cuisine, fashion, and wine',
        'Famous figures: Napoleon Bonaparte, Marie Curie, Claude Monet'
    ],
    'Gabon': [
        'Known for its lush rainforests and wildlife, including gorillas',
        'Home to beautiful beaches and the largest national park in Africa',
        'Famous figures: Omar Bongo, Ali Bongo Ondimba'
    ],
    'Gambia': [
        'A small country in West Africa, known for its beaches and wildlife',
        'Home to the Gambia River, a key landmark',
        'Famous figures: Yahya Jammeh, Ousman Sillah'
    ],
    'Georgia': [
        'Known for its wine-making history and the Caucasus Mountains',
        'Home to one of the worlds oldest wine-making regions',
        'Famous figures: Joseph Stalin, Nino Katamadze'
    ],
    'Germany': [
        'Home to iconic landmarks like the Brandenburg Gate and Neuschwanstein Castle',
        'Famous for its beer, sausages, and automobiles (Mercedes, BMW)',
        'Famous figures: Albert Einstein, Ludwig van Beethoven, Angela Merkel'
    ],
    'Ghana': [
        'Known for its rich gold resources and colorful culture',
        'Famous for its historic slave forts and independence movement',
        'Famous figures: Kwame Nkrumah, Kofi Annan'
    ],
    'Greece': [
        'Home to the ancient ruins of Athens and the Acropolis',
        'Known for its rich mythology and beautiful islands like Santorini',
        'Famous figures: Alexander the Great, Socrates, Maria Callas'
    ],
    'Grenada': [
        'Known as the "Island of Spice" for its production of nutmeg',
        'Home to beautiful beaches and the Grand Anse Beach',
        'Famous figures: Maurice Bishop, Kirani James'
    ],
    'Guatemala': [
        'Home to ancient Mayan ruins, including Tikal',
        'Known for its coffee and vibrant indigenous culture',
        'Famous figures: Rigoberta Menchú, Juan José Arévalo'
    ],
    'Guinea': [
        'Known for its rich natural resources, including bauxite and gold',
        'Famous for its diverse ethnic groups and culture',
        'Famous figures: Sekou Touré, Alpha Condé'
    ],
    'Guinea-Bissau': [
        'A small country in West Africa known for its wildlife and tropical beaches',
        'Famous for its groundnut (peanut) exports',
        'Famous figures: Amílcar Cabral, José Mário Vaz'
    ],
    'Guyana': [
        'Known for its diverse ethnic groups and Amazon rainforest',
        'Famous for its gold, sugar, and rice exports',
        'Famous figures: Cheddi Jagan, Janet Jagan'
    ],
    'Haiti': [
        'The first independent nation in Latin America and the Caribbean',
        'Known for its rich cultural history and art',
        'Famous figures: Toussaint Louverture, Jean-Bertrand Aristide'
    ],
    'Honduras': [
        'Known for its Mayan ruins, including Copán',
        'Home to beautiful beaches and the Bay Islands',
        'Famous figures: Juan Orlando Hernández, Rigoberto Urán'
    ],
    'Hungary': [
        'Famous for its architecture, including the Buda Castle and Parliament Building',
        'Known for its folk music, paprika, and thermal baths',
        'Famous figures: Franz Liszt, László Nemes'
    ],
    'Iceland': [
        'Known for its stunning landscapes, including glaciers, volcanoes, and geysers',
        'Famous for its geothermal energy and eco-friendly practices',
        'Famous figures: Björk, Halldór Laxness'
    ],
    'India': [
        'Famous for its rich history, including the Taj Mahal and ancient temples',
        'Known for its diverse cultures, languages, and cuisine',
        'Famous figures: Mahatma Gandhi, Indira Gandhi, Sachin Tendulkar'
    ],
    'Indonesia': [
        'Home to thousands of islands, including Bali and Java',
        'Known for its biodiversity, including endangered species like the orangutan',
        'Famous figures: Sukarno, B.J. Habibie, Anggun'
    ],
    'Iran': [
        'Known for its ancient civilization, including Persepolis',
        'Famous for its rich cultural heritage, including poetry and Persian carpets',
        'Famous figures: Cyrus the Great, Mohammad Reza Pahlavi, Shirin Ebadi'
    ],
    'Iraq': [
        'Known for its ancient Mesopotamian civilization and the Tigris-Euphrates river system',
        'Home to ancient ruins, including Babylon and Nineveh',
        'Famous figures: Saddam Hussein, Nuri al-Maliki'
    ],
    'Ireland': [
        'Known for its lush green landscapes and rich cultural heritage',
        'Famous for its traditional music, literature, and Irish whiskey',
        'Famous figures: James Joyce, W.B. Yeats, Conor McGregor'
    ],
    'Israel': [
        'Known for its religious significance to Judaism, Christianity, and Islam',
        'Home to the Dead Sea, the Sea of Galilee, and the city of Jerusalem',
        'Famous figures: David Ben-Gurion, Golda Meir, Shimon Peres'
    ],
    'Italy': [
        'Famous for its art, architecture, and cuisine (pizza, pasta)',
        'Home to the Vatican City, the Colosseum, and the Leaning Tower of Pisa',
        'Famous figures: Leonardo da Vinci, Michelangelo, Sophia Loren'
    ],
    'Jamaica': [
        'Known for its reggae music and famous musicians like Bob Marley',
        'Famous for its beautiful beaches and resorts',
        'Famous figures: Bob Marley, Usain Bolt, Marcus Garvey'
    ],
    'Japan': [
        'Known for its advanced technology, cherry blossoms, and Mount Fuji',
        'Famous for its cuisine, including sushi, and traditional tea ceremonies',
        'Famous figures: Haruki Murakami, Akira Kurosawa, Shigeru Miyamoto'
    ],
    'Jordan': [
        'Home to the ancient city of Petra, a UNESCO World Heritage site',
        'Known for the Dead Sea, the lowest point on Earth',
        'Famous figures: King Hussein, Queen Rania, Zaha Hadid'
    ],
    'Kazakhstan': [
        'Known for its vast steppe and the spaceport of Baikonur',
        'Famous for its nomadic traditions and the countrys rich mineral resources',
        'Famous figures: Nursultan Nazarbayev, Gennady Golovkin'
    ],
    'Kenya': [
        'Famous for its safaris and wildlife, including the "Big Five" animals',
        'Known for its long-distance runners and athletics',
        'Famous figures: Jomo Kenyatta, Wangari Maathai, Eliud Kipchoge'
    ],
    'Kuwait': [
        'Famous for its oil reserves and modern skyline',
        'Home to the Kuwait Towers and a rich cultural history',
        'Famous figures: Sheikh Sabah Al-Ahmad Al-Jaber Al-Sabah, Nasser Al-Dosari'
    ],
    'Kyrgyzstan': [
        'Known for its mountainous landscapes and nomadic heritage',
        'Famous for the Issyk-Kul lake and Tien Shan mountains',
        'Famous figures: Askar Akayev, Chinghiz Aitmatov'
    ],
    'Laos': [
        'Famous for its Buddhist temples and natural beauty, including waterfalls',
        'Home to the UNESCO World Heritage site of Luang Prabang',
        'Famous figures: Kaysone Phomvihane, Thongsing Thammavong'
    ],
    'Latvia': [
        'Known for its beautiful landscapes, including beaches and forests',
        'Famous for its art nouveau architecture in Riga',
        'Famous figures: Arvīds Žukausks, Maris Štrombergs'
    ],
    'Lebanon': [
        'Famous for its rich cultural heritage and ancient ruins like Baalbek',
        'Known for its Mediterranean beaches, wine, and cuisine',
        'Famous figures: Khalil Gibran, Fairuz, Rami Makhlouf'
    ],
    'Lesotho': [
        'Known as the "Kingdom in the Sky" due to its high altitude',
        'Famous for its unique culture and colorful handicrafts',
        'Famous figures: King Letsie III, Nehemiah Sekhonyana'
    ],
    'Liberia': [
        'The first African country to declare independence',
        'Known for its tropical forests and wildlife',
        'Famous figures: Ellen Johnson Sirleaf, George Weah'
    ],
    'Libya': [
        'Known for its ancient Roman ruins, including Sabratha and Leptis Magna',
        'Home to the Sahara Desert and the Mediterranean coast',
        'Famous figures: Muammar Gaddafi, Fathi Terbil'
    ],
    'Liechtenstein': [
        'A small, landlocked country known for its mountainous landscapes',
        'Famous for its status as a tax haven and financial services industry',
        'Famous figures: Prince Hans-Adam II, Alois, Hereditary Prince of Liechtenstein'
    ],
    'Lithuania': [
        'Famous for its medieval history and beautiful capital, Vilnius',
        'Known for its rich traditions in basketball',
        'Famous figures: Dainius Šuliauskas, Antanas Smetona'
    ],
    'Luxembourg': [
        'A small, wealthy country known for its banking and finance sectors',
        'Home to medieval castles and stunning forests',
        'Famous figures: Jean-Claude Juncker, Henri, Grand Duke of Luxembourg'
    ],
    'Madagascar': [
        'Famous for its unique biodiversity and wildlife, including lemurs',
        'Home to the Avenue of the Baobabs and tropical rainforests',
        'Famous figures: Marc Ravalomanana, Andry Rajoelina'
    ],
    'Malawi': [
        'Known for Lake Malawi, one of the largest lakes in Africa',
        'Famous for its diverse wildlife and national parks',
        'Famous figures: Hastings Banda, Joyce Banda'
    ],
    'Malaysia': [
        'Famous for its mix of Malay, Chinese, and Indian cultures',
        'Known for its stunning islands, including Langkawi and Penang',
        'Famous figures: Mahathir Mohamad, Anwar Ibrahim'
    ],
    'Maldives': [
        'Known for its overwater bungalows and coral reefs',
        'Famous for being a popular luxury tourist destination',
        'Famous figures: Mohamed Nasheed, Maumoon Abdul Gayoom'
    ],
    'Mali': [
        'Famous for its rich history, including the ancient city of Timbuktu',
        'Known for its music, especially the desert blues genre',
        'Famous figures: Amadou Toumani Touré, Salif Keita'
    ],
    'Malta': [
        'Known for its ancient architecture, including the Megalithic Temples',
        'Famous for its strategic location in the Mediterranean Sea',
        'Famous figures: Dom Mintoff, George Cross'
    ],
    'Mauritania': [
        'Known for its desert landscapes, including the Sahara',
        'Famous for its nomadic culture and salt mines',
        'Famous figures: Moktar Ould Daddah, Aziz Abdelaziz'
    ],
    'Mauritius': [
        'Famous for its tropical climate, beaches, and diverse wildlife',
        'Known for the extinct dodo bird, once native to the island',
        'Famous figures: Sir Seewoosagur Ramgoolam, Anerood Jugnauth'
    ],
    'Mexico': [
        'Famous for its rich history, including ancient Mayan and Aztec cultures',
        'Known for its vibrant food, including tacos, guacamole, and tequila',
        'Famous figures: Frida Kahlo, Diego Rivera, Carlos Slim'
    ],
    'Moldova': [
        'Famous for its vineyards and wine production',
        'Known for its rich history of Soviet influence',
        'Famous figures: Nicolae Ceaușescu, Igor Dodon'
    ],
    'Monaco': [
        'A small, wealthy country known for its luxurious casinos and yachts',
        'Famous for hosting the Monaco Grand Prix and its royal family',
        'Famous figures: Grace Kelly, Prince Albert II'
    ],
    'Mongolia': [
        'Known for its vast steppes, nomadic traditions, and the Gobi Desert',
        'Famous for its historical figures like Genghis Khan',
        'Famous figures: Tsakhiagiin Elbegdorj, Munkhbat'
    ],
    'Montenegro': [
        'Known for its stunning Adriatic coastline and historic cities',
        'Famous for its mountainous landscapes and medieval towns',
        'Famous figures: Milo Đukanović, Duško Ivanović'
    ],
    'Morocco': [
        'Known for its beautiful cities like Marrakesh, Casablanca, and Fes',
        'Famous for its cuisine, including couscous and tagine',
        'Famous figures: King Mohammed VI, Ibn Battuta'
    ],
    'Mozambique': [
        'Famous for its Indian Ocean coastline and pristine beaches',
        'Known for its natural resources, including coal and natural gas',
        'Famous figures: Samora Machel, Graça Machel'
    ],
    'Myanmar': [
        'Known for its ancient temples, including those in Bagan',
        'Famous for its long political struggle and military dictatorship',
        'Famous figures: Aung San Suu Kyi, General Ne Win'
    ],
    'Namibia': [
        'Famous for its stunning desert landscapes, including the Namib Desert',
        'Known for wildlife safaris and the Etosha National Park',
        'Famous figures: Sam Nujoma, Hifikepunye Pohamba'
    ],
    'Nepal': [
        'Known for the Himalayas, including Mount Everest, the worlds highest peak',
        'Famous for its Buddhist heritage, including the city of Lumbini, Buddhas birthplace',
        'Famous figures: Sir Edmund Hillary, Tenzing Norgay, Sushil Koirala'
    ],
    'Netherlands': [
        'Famous for its windmills, tulip fields, and canals',
        'Known for being one of the most bike-friendly countries in the world',
        'Famous figures: Anne Frank, Vincent van Gogh, Marco van Basten'
    ],
    'New Zealand': [
        'Known for its beautiful landscapes and adventure tourism',
        'Famous for being the filming location for the *Lord of the Rings* series',
        'Famous figures: Sir Edmund Hillary, Peter Jackson, Jacinda Ardern'
    ],
    'Nicaragua': [
        'Known for its volcanoes, lakes, and colonial architecture',
        'Famous for its historical struggle for political independence',
        'Famous figures: Daniel Ortega, Violeta Chamorro'
    ],
    'Niger': [
        'Famous for its vast Sahara Desert landscapes',
        'Known for the Aïr Mountains and ancient trade routes',
        'Famous figures: Mahamadou Issoufou, Seyni Oumarou'
    ],
    'Nigeria': [
        'Known for its diverse ethnic groups and the bustling city of Lagos',
        'Famous for its film industry, Nollywood',
        'Famous figures: Chinua Achebe, Wole Soyinka, Muhammadu Buhari'
    ],
    'North Korea': [
        'Known for its authoritarian regime and secrecy',
        'Famous for its military parades and the Kim family dictatorship',
        'Famous figures: Kim Il-sung, Kim Jong-il, Kim Jong-un'
    ],
    'Macedonia': [
        'Known for its rich history and ancient ruins, including those in Ohrid',
        'Famous for its diverse mix of ethnic groups and languages',
        'Famous figures: Mother Teresa, Boris Trajkovski'
    ],
    'Norway': [
        'Known for its dramatic fjords and coastal beauty',
        'Famous for its Viking heritage and royal family',
        'Famous figures: Henrik Ibsen, Edvard Munch, Roald Amundsen'
    ],
    'Oman': [
        'Known for its deserts, beaches, and historic forts',
        'Famous for its culture of hospitality and traditional architecture',
        'Famous figures: Sultan Qaboos bin Said'
    ],
    'Pakistan': [
        'Known for its diverse landscapes, including the Himalayas and the Thar Desert',
        'Famous for its rich history, including the Indus Valley Civilization',
        'Famous figures: Malala Yousafzai, Imran Khan, Abdul Sattar Edhi'
    ],
    'Palestine': [
        'Known for its historical and religious significance, including Jerusalem',
        'Famous for the ongoing Israeli-Palestinian conflict',
        'Famous figures: Yasser Arafat, Mahmoud Abbas'
    ],
    'Panama': [
        'Known for the Panama Canal, a crucial shipping route',
        'Famous for its tropical rainforests and biodiversity',
        'Famous figures: Omar Torrijos, Ricardo Martinelli'
    ],
    'Papua New Guinea': [
        'Known for its diverse languages and indigenous cultures',
        'Famous for its coral reefs and biodiversity in the Pacific Ocean',
        'Famous figures: Michael Somare, Sam Basil'
    ],
    'Paraguay': [
        'Known for its rivers, such as the Paraná and Paraguay Rivers',
        'Famous for its Guarani culture and language',
        'Famous figures: Alfredo Stroessner, Mario Abdo Benítez'
    ],
    'Peru': [
        'Famous for the ancient Inca city of Machu Picchu',
        'Known for its rich cultural heritage and diverse landscapes',
        'Famous figures: Mario Vargas Llosa, César Vallejo, Ollanta Humala'
    ],
    'Philippines': [
        'Known for its beautiful beaches, including Boracay and Palawan',
        'Famous for its vibrant culture, music, and festivals',
        'Famous figures: José Rizal, Ferdinand Marcos, Manny Pacquiao'
    ],
    'Poland': [
        'Known for its historical sites like Auschwitz and the Wawel Castle',
        'Famous for its contributions to science, including Marie Curie',
        'Famous figures: Lech Walesa, Andrzej Wajda, Wisława Szymborska'
    ],
    'Portugal': [
        'Famous for its rich history of exploration, including Vasco da Gama',
        'Known for its beautiful coastline and beaches',
        'Famous figures: Cristiano Ronaldo, Fernando Pessoa, Amália Rodrigues'
    ],
    'Qatar': [
        'Known for its wealth, particularly from oil and natural gas',
        'Famous for hosting the 2022 FIFA World Cup',
        'Famous figures: Tamim bin Hamad Al Thani'
    ],
    'Romania': [
        'Known for its castles, including Bran Castle, associated with Dracula',
        'Famous for the Carpathian Mountains and the Danube River',
        'Famous figures: Nadia Comăneci, Vlad the Impaler, George Enescu'
    ],
    'Russia': [
        'The world\'s largest country by area, spanning Europe and Asia',
        'Known for its rich cultural heritage, including literature and ballet',
        'Famous figures: Leo Tolstoy, Pyotr Ilyich Tchaikovsky, Vladimir Putin'
    ],
    'Rwanda': [
        'Known for its breathtaking landscapes, including volcanoes and lakes',
        'Famous for its tragic 1994 genocide and subsequent recovery',
        'Famous figures: Paul Kagame, Dian Fossey'
    ],
    'Saint Kitts and Nevis': [
        'Known as the smallest country in the Western Hemisphere by land area',
        'Famous for its sugar plantations and the scenic St. Kitts mountain',
        'Famous figures: Timothy Harris, Vance Amory'
    ],
    'Saint Lucia': [
        'Famous for its twin volcanic mountains, the Pitons',
        'Known for its tropical rainforests and luxury tourism',
        'Famous figures: Derek Walcott, Kenny Anthony'
    ],
    'Saint Vincent and the Grenadines': [
        'Known for its beautiful beaches and islands',
        'Famous for its volcano, La Soufrière',
        'Famous figures: Ralph Gonsalves'
    ],
    'Samoa': [
        'Known for its Polynesian culture and stunning beaches',
        'Famous for its traditional tattoo art and the fiafia night',
        'Famous figures: David Tua, Tuilaepa Aiono Sailele Malielegaoi'
    ],
    'San Marino': [
        'One of the world\'s smallest countries, surrounded by Italy',
        'Known for its medieval architecture and ancient history',
        'Famous figures: Federico Cini, Giovanni Francesco'
    ],
    'Sao Tome and Principe': [
        'Famous for its cocoa production and tropical rainforests',
        'Known for its volcanic landscapes and pristine beaches',
        'Famous figures: Evaristo Carvalho'
    ],
    'Saudi Arabia': [
        'Known for being the birthplace of Islam and housing Mecca and Medina',
        'Famous for its oil wealth and the ongoing modernization under Vision 2030',
        'Famous figures: King Salman, Mohammed bin Salman'
    ],
    'Senegal': [
        'Known for its vibrant culture, music (like mbalax), and art',
        'Famous for the historical slave port of Gorée Island',
        'Famous figures: Leopold Sedar Senghor, Youssou N\'Dour'
    ],
    'Serbia': [
        'Known for its historic fortresses, including Kalemegdan',
        'Famous for its vibrant music and cultural festivals',
        'Famous figures: Novak Djokovic, Nikola Tesla'
    ],
    'Sierra Leone': [
        'Famous for its beautiful beaches and rich cultural heritage',
        'Known for its diamond mines and history of civil conflict',
        'Famous figures: Ernest Bai Koroma, Mohamed Kallon'
    ],
    'Singapore': [
        'Known for its impressive skyline, including the Marina Bay Sands',
        'Famous for its strict laws and cleanliness',
        'Famous figures: Lee Kuan Yew, Joseph Schooling'
    ],
    'Slovakia': [
        'Known for its medieval towns, castles, and the Tatra Mountains',
        'Famous for its folk music and traditional crafts',
        'Famous figures: Milan Kňažko, Rudolf Vrba'
    ],
    'Slovenia': [
        'Famous for its beautiful lakes, including Lake Bled',
        'Known for its caves, like the Postojna Cave',
        'Famous figures: Melania Trump, Primož Roglič'
    ],
    'Solomon Islands': [
        'Known for its WWII history, especially the Battle of Guadalcanal',
        'Famous for its beautiful beaches and coral reefs',
        'Famous figures: Sir Frank Kabui'
    ],
    'Somalia': [
        'Known for its long coastline along the Horn of Africa',
        'Famous for its rich oral tradition and poetry',
        'Famous figures: Mohamed Siad Barre, Nuruddin Farah'
    ],
    'South Africa': [
        'Known for its diverse culture, wildlife, and history of apartheid',
        'Famous for landmarks like Table Mountain and Kruger National Park',
        'Famous figures: Nelson Mandela, Desmond Tutu, Charlize Theron'
    ],
    'South Korea': [
        'Known for its technology companies like Samsung and LG',
        'Famous for its K-pop music industry and global influence',
        'Famous figures: Psy, BTS, Park Geun-hye'
    ],
    'South Sudan': [
        'The worlds newest country, gaining independence in 2011',
        'Known for its diverse ethnic groups and civil conflict',
        'Famous figures: Salva Kiir Mayardit'
    ],
    'Spain': [
        'Known for its rich history, art, and flamenco dance',
        'Famous for landmarks like La Sagrada Familia and Alhambra',
        'Famous figures: Pablo Picasso, Salvador Dalí, Rafael Nadal'
    ],
    'Sri Lanka': [
        'Known for its beautiful beaches and tea plantations',
        'Famous for its Buddhist temples and cultural festivals',
        'Famous figures: Kumar Sangakkara, Muttiah Muralitharan'
    ],
    'Sudan': [
        'Known for its ancient pyramids in Meroë',
        'Famous for its role in African history and the Nile River',
        'Famous figures: Omar al-Bashir, Abiy Ahmed'
    ],
    'Suriname': [
        'Known for its vast rainforests and wildlife',
        'Famous for its Dutch colonial architecture',
        'Famous figures: Dési Bouterse, Rudi Krol'
    ],
    'Sweden': [
        'Known for its beautiful landscapes, including the Northern Lights',
        'Famous for its Viking history and modern welfare state',
        'Famous figures: Greta Garbo, Alfred Nobel, ABBA'
    ],
    'Switzerland': [
        'Famous for its neutrality in global conflicts',
        'Known for its alpine landscapes and luxury watches',
        'Famous figures: Albert Einstein, Jean-Jacques Rousseau'
    ],
    'Syria': [
        'Known for its rich ancient history, including the ruins of Palmyra',
        'Famous for its ongoing civil war and humanitarian crisis',
        'Famous figures: Bashar al-Assad, Omar Mukhtar'
    ],
    'Taiwan': [
        'Known for its advanced technology industry and electronics',
        'Famous for its bustling capital, Taipei, and its night markets',
        'Famous figures: Tsai Ing-wen, Ang Lee'
    ],
    'Tajikistan': [
        'Known for its mountainous terrain and the Pamir Mountains',
        'Famous for its Soviet-era history and cultural diversity',
        'Famous figures: Emomali Rahmon'
    ],
    'Tanzania': [
        'Known for the Serengeti National Park and Mount Kilimanjaro',
        'Famous for its wildlife and cultural diversity',
        'Famous figures: Julius Nyerere, Ali Hassan Mwinyi'
    ],
    'Thailand': [
        'Known for its beautiful beaches, temples, and cuisine',
        'Famous for its vibrant culture, including Muay Thai',
        'Famous figures: King Bhumibol Adulyadej, Somtow Sucharitkul'
    ],
    'Togo': [
        'Known for its palm-lined beaches and Togo Mountains',
        'Famous for its rich culture and history of French colonial rule',
        'Famous figures: Gnassingbé Eyadéma, Emmanuelle Gattuso'
    ],
    'Trinidad and Tobago': [
        'Known for its vibrant Carnival celebration',
        'Famous for its rich cultural diversity, especially Afro-Caribbean culture',
        'Famous figures: Brian Lara, Nicki Minaj, Michael Lee-Chin'
    ],
    'Tunisia': [
        'Known for its ancient ruins, including Carthage',
        'Famous for its Mediterranean beaches and rich history',
        'Famous figures: Habib Bourguiba, Zine El Abidine Ben Ali'
    ],
    'Turkey': [
        'Famous for its rich history as the center of the Ottoman Empire',
        'Known for landmarks like Hagia Sophia and the Blue Mosque, plus Tea, Coffee, Doner, Baklava and Cats',
        'Famous figures: Mustafa Kemal Atatürk, Orhan Pamuk, Hidayet Turkoglu'
    ],
    'Turkmenistan': [
        'Known for its vast deserts, especially the Karakum Desert',
        'Famous for the Door to Hell, a natural gas field that has been burning for decades',
        'Famous figures: Gurbanguly Berdimuhamedow'
    ],
    'Tuvalu': [
        'Known for being one of the smallest and least populated countries in the world',
        'Famous for its low-lying islands and vulnerability to climate change',
        'Famous figures: Enele Sopoaga'
    ],
    'Uganda': [
        'Known for its diverse wildlife, including mountain gorillas',
        'Famous for its rich culture and music',
        'Famous figures: Yoweri Museveni, Idi Amin'
    ],
    'Ukraine': [
        'Known for its rich cultural heritage and history',
        'Famous for its agricultural products, especially wheat and sunflower oil',
        'Famous figures: Volodymyr Zelenskyy, Andriy Shevchenko'
    ],
    'United Arab Emirates': [
        'Known for its modern architecture, especially in Dubai',
        'Famous for the Burj Khalifa, the tallest building in the world',
        'Famous figures: Mohammed bin Zayed, Sheikh Zayed'
    ],
    'United Kingdom': [
        'Known for its monarchy and historic landmarks like Buckingham Palace',
        'Famous for cultural contributions in music, literature, and art',
        'Famous figures: Queen Elizabeth II, William Shakespeare, Winston Churchill'
    ],
    'United States of America': [
        'Known for its global influence, especially in politics, economy, and culture',
        'Famous for landmarks like the Statue of Liberty and the White House',
        'Famous figures: George Washington, Abraham Lincoln, Martin Luther King Jr., Michael Jackson'
    ],
    'Uruguay': [
        'Known for its beautiful beaches along the Atlantic coast',
        'Famous for its strong soccer culture and being the first World Cup winners',
        'Famous figures: José Mujica, Diego Forlán'
    ],
    'Uzbekistan': [
        'Known for its rich history as a part of the Silk Road',
        'Famous for landmarks like Registan Square in Samarkand',
        'Famous figures: Islam Karimov, Mirza Ulugh Beg'
    ],
    'Vanuatu': [
        'Known for its volcanic landscapes and coral reefs',
        'Famous for its indigenous Melanesian culture',
        'Famous figures: Joe Natuman, Maxime Carlot Korman'
    ],
    'Venezuela': [
        'Known for its vast oil reserves and political instability',
        'Famous for Angel Falls, the worlds tallest uninterrupted waterfall',
        'Famous figures: Hugo Chávez, Simón Bolívar'
    ],
    'Vietnam': [
        'Known for its beautiful landscapes, including Ha Long Bay',
        'Famous for its role in the Vietnam War and its communist government',
        'Famous figures: Ho Chi Minh, Võ Nguyên Giáp'
    ],
    'Yemen': [
        'Known for its ancient cities, including Sanaa, a UNESCO World Heritage site',
        'Famous for its coffee and rich cultural history',
        'Famous figures: Ali Abdullah Saleh, Abdul-Malik al-Houthi'
    ],
    'Zambia': [
        'Known for its natural beauty, including Victoria Falls',
        'Famous for its rich wildlife and national parks',
        'Famous figures: Kenneth Kaunda, Michael Sata'
    ],
    'Zimbabwe': [
        'Known for its rich mineral resources and stunning landscapes',
        'Famous for the Great Zimbabwe Ruins and Victoria Falls',
        'Famous figures: Robert Mugabe, Morgan Tsvangirai'
    ]
    
        };

        // Add this near the top of your file with other global variables
        let secretCodes = {
            'vinlocked': () => {
                // Skip current country in hints mode
                if (gameMode === 'hints') {
                    showMessage(true);
                    currentScore += 1;
                    document.getElementById('current-score').textContent = currentScore;
                    startNewRound();
                }
            },
            'odyssey': () => {
                // Check if targetCountry is set
                if (targetCountry) {
                    geojsonLayer.eachLayer(function(layer) {
                        const countryName = layer.feature.properties.ADMIN;

                        // Check if the current layer matches the target country
                        if (countryName === targetCountry) {
                            layer.setStyle({
                                fillColor: '#f1c40f',
                                fillOpacity: 0.6
                            });

                            // Reset the style after 2 seconds
                            setTimeout(() => {
                                layer.setStyle({
                                    fillColor: '#95a5a6',
                                    fillOpacity: 0.2
                                });
                            }, 2000);
                        }
                    });
                }
            },
            'imranli': () => {
                // Add 30 seconds in time mode
                if (gameMode === 'time' && timeLeft > 0) {
                    timeLeft += 30;
                    updateTimer();
                    showMessage(true);
                }
            }
        };

        // Add this code to handle secret code detection
        let currentCode = '';
        let codeTimeout;

        document.addEventListener('keydown', (e) => {
            // Only track alphabetical keys
            if (/^[a-zA-Z]$/.test(e.key)) {
                currentCode += e.key.toLowerCase();
                
                // Check if any secret code matches
                Object.keys(secretCodes).forEach(code => {
                    if (currentCode.endsWith(code)) {
                        secretCodes[code]();
                        // Flash effect on successful code
                        document.body.style.backgroundColor = '#f0f0f0';
                        setTimeout(() => {
                            document.body.style.backgroundColor = '';
                        }, 200);
                    }
                });
                
                // Reset after 2 seconds of no input
                clearTimeout(codeTimeout);
                codeTimeout = setTimeout(() => {
                    currentCode = '';
                }, 2000);
            }
        });

        function initMap() {
            map = L.map('map-container', {
                zoomControl: true,
                minZoom: 2,
                maxZoom: 8,
                worldCopyJump: true
            }).setView([20, 0], difficultyZoom[difficulty]);
            
            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
                attribution: '©OpenStreetMap, ©CartoDB'
            }).addTo(map);

            fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
                .then(response => response.json())
                .then(data => {
                    geojsonLayer = L.geoJSON(data, {
                        style: function(feature) {
                            return {
                                fillColor: '#95a5a6',
                                weight: 1,
                                opacity: 1,
                                color: '#2c3e50',
                                fillOpacity: 0.2
                            };
                        }
                    }).addTo(map);

                    geojsonLayer.eachLayer(function(layer) {
                        layer.on({
                            mouseover: highlightFeature,
                            mouseout: resetHighlight,
                            click: countryClick
                        });
                    });
                })
                .catch(error => console.error('Error loading GeoJSON:', error));

            startNewRound();
        }

        function countryClick(e) {
            const layer = e.target;
            const clickedCountry = layer.feature.properties.ADMIN;
            
            // Add console.log to debug the clicked country name
            console.log('Clicked country properties:', layer.feature.properties);
            
            // Create a mapping for special cases
            const countryMapping = {
                'United Republic of Tanzania': 'Tanzania',
                'The former Yugoslav Republic of Macedonia': 'North Macedonia',
                'Republic of North Macedonia': 'North Macedonia',
                'Cape Verde': 'Cabo Verde',  // Add this line to handle the naming variation
                "The Bahamas": "Bahamas",   
                // Add more mappings as needed
            };

            // Get the normalized country name
            const normalizedCountry = countryMapping[clickedCountry] || clickedCountry;
            
            console.log('Normalized country:', normalizedCountry);
            console.log('Target country:', targetCountry);
            
            if (normalizedCountry === targetCountry) {
                layer.setStyle({
                    fillColor: '#2ecc71',
                    fillOpacity: 0.6
                });
                
                setTimeout(() => {
                    layer.setStyle({
                        fillColor: '#95a5a6',
                        fillOpacity: 0.2
                    });
                    checkAnswer({
                        countryName: normalizedCountry,
                        latlng: e.latlng
                    });
                }, 500);
            } else {
                layer.setStyle({
                    fillColor: '#e74c3c',
                    fillOpacity: 0.6
                });
                
                setTimeout(() => {
                    layer.setStyle({
                        fillColor: '#95a5a6',
                        fillOpacity: 0.2
                    });
                    checkAnswer({
                        countryName: normalizedCountry,
                        latlng: e.latlng
                    });
                }, 500);
            }
        }

        function highlightFeature(e) {
            const layer = e.target;
            
            layer.setStyle({
                fillOpacity: 0.5,
                weight: 2,
                color: '#666'
            });
        }

        function resetHighlight(e) {
            const layer = e.target;
            layer.setStyle({
                fillOpacity: 0.2,
                weight: 1,
                color: '#2c3e50'
            });
        }

        function showMessage(isSuccess) {
            const messageContainer = document.getElementById('message-container');
            let messages;
            
            if (gameMode === 'hints') {
                messages = isSuccess ? hintSuccessMessages : errorMessages;
            } else if (difficulty === 'ultra') {
                messages = isSuccess ? ultraSuccessMessages : errorMessages;
            } else {
                messages = isSuccess ? successMessages : errorMessages;
            }
            
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            
            messageContainer.textContent = randomMessage;
            messageContainer.className = isSuccess ? 'success-message' : 'error-message';
            messageContainer.style.opacity = '1';

            setTimeout(() => {
                messageContainer.style.opacity = '0';
            }, 2000);
        }

        function checkAnswer(clicked) {
            if (!isGameActive) return;
            
            if (clicked.countryName === targetCountry) {
                correctAttempts++;
                
                if (gameMode === 'hints') {
                    currentScore += {
                        easy: 1,
                        normal: 2,
                        hard: 3,
                        ultra: 5
                    }[difficulty];
                    
                    document.getElementById('current-score').textContent = currentScore;
                    document.getElementById('timer').textContent = 
                        `Hints Mode - Score: ${currentScore}`;
                    
                    startNewRound();
                    showMessage(true);
                } else if (gameMode === 'streak') {
                    currentStreak++;
                    bestStreak = Math.max(bestStreak, currentStreak);
                    
                    document.getElementById('current-streak').textContent = currentStreak;
                    document.getElementById('max-streak').textContent = bestStreak;
                    document.getElementById('current-score').textContent = currentStreak;
                    
                    const streakCounter = document.getElementById('streak-counter');
                    streakCounter.classList.add('streak-highlight');
                    setTimeout(() => streakCounter.classList.remove('streak-highlight'), 500);
                    
                    showStreakMessage(true);
                    startNewRound();
                } else if (gameMode === 'alphabetic') {
                    foundCountries.add(targetCountry);
                    
                    geojsonLayer.eachLayer(function(layer) {
                        if (layer.feature.properties.ADMIN === targetCountry) {
                            layer.setStyle({
                                fillColor: '#2ecc71',
                                fillOpacity: 0.6
                            });
                        }
                    });
                    
                    alphabeticIndex++;
                    document.getElementById('current-score').textContent = 
                        `${foundCountries.size}/${sortedCountries.length}`;
                    
                    if (alphabeticIndex >= sortedCountries.length) {
                        endGame();
                        return;
                    }
                    
                    targetCountry = sortedCountries[alphabeticIndex];
                    const nextCountry = alphabeticIndex + 1 < sortedCountries.length ? 
                        sortedCountries[alphabeticIndex + 1] : 'Last country!';
                    document.getElementById('country-to-find').innerHTML = 
                        `${targetCountry}<div id="next-country">Next: ${nextCountry}</div>`;
                    
                } else if (gameMode === 'time') {
                    currentScore += {
                        easy: 1,
                        normal: 2,
                        hard: 3,
                        ultra: 5
                    }[difficulty];
                    
                    document.getElementById('current-score').textContent = currentScore;
                    startNewRound();
                } else if (gameMode === 'all') {
                    foundCountries.add(targetCountry);
                    geojsonLayer.eachLayer(function(layer) {
                        if (layer.feature.properties.ADMIN === targetCountry) {
                            layer.setStyle({
                                fillColor: '#2ecc71',
                                fillOpacity: 0.6
                            });
                        }
                    });
                    
                    document.getElementById('current-score').textContent = 
                        `${foundCountries.size}/${countries[difficulty].length}`;
                    
                    if (foundCountries.size >= countries[difficulty].length) {
                        endGame();
                        return;
                    }
                    startNewRound();
                }
                
                showMessage(true);
            } else {
                incorrectAttempts++;
                
                if (gameMode === 'streak') {
                    showStreakMessage(false);
                    setTimeout(() => {
                        endGame();
                    }, 1000);
                } else {
                    showMessage(false);
                }
            }
        }

        function setDifficulty(level) {
            difficulty = level;
            map.setZoom(difficultyZoom[level]);
            currentScore = 0;
            document.getElementById('current-score').textContent = currentScore;
            startNewRound();
        }

        function startNewRound() {
            if (!isGameActive) return;
            
            // For 'all' mode, check if all countries are found
            if (gameMode === 'all' && foundCountries.size >= countries[difficulty].length) {
                endGame();
                return;
            }
            
            // If all countries have been used, reset the pool
            if (usedCountries.size >= countries[difficulty].length) {
                if (gameMode === 'all') {
                    endGame();
                    return;
                }
                usedCountries.clear();
                availableCountries = [...countries[difficulty]];
            }
            
            // Filter out already used countries
            const unusedCountries = availableCountries.filter(country => !usedCountries.has(country));
            
            // Select random country from unused ones
            const randomIndex = Math.floor(Math.random() * unusedCountries.length);
            targetCountry = unusedCountries[randomIndex];
            
            // Add to used countries set
            usedCountries.add(targetCountry);
            
            // Update display based on game mode
            if (gameMode === 'hints') {
                // Reset hints for new country
                hintsRemaining = 2; // 2 remaining hints since we show the first one
                updateHintButton();
                
                // Show first hint
                const hints = countryHints[targetCountry] || [
                    'A country waiting to be discovered',
                    'Keep exploring!',
                    'You\'re getting closer!'
                ];
                
                document.getElementById('country-to-find').innerHTML = 
                    `<div style="font-size: 16px; color: #666;">${hints[0]}</div>`;
            } else {
                // For all other modes, show the country name
                document.getElementById('country-to-find').textContent = targetCountry;
            }
        }

        function startGame(selectedDifficulty) {
            difficulty = selectedDifficulty;
            localStorage.setItem('selectedDifficulty', selectedDifficulty); // Store the selected difficulty
            window.location.reload(); // Refresh the page
        }

        function finishGame() {
            if (gameMode === 'hints') {
                endGame(); // Immediately end the game in hints mode
            } else if (confirm('Are you sure you want to end the game?')) {
                endGame();
            }
        }

        function startTimer() {
            gameTimer = setInterval(() => {
                timeLeft--;
                updateTimer();
                
                if (timeLeft <= 0) {
                    endGame();
                }
            }, 1000);
        }

        function updateTimer() {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            document.getElementById('timer').textContent = 
                `Time: ${minutes}:${seconds.toString().padStart(2, '0')}`;
        }

        function endGame() {
            clearInterval(gameTimer);
            isGameActive = false;
            
            // Hide game buttons
            document.getElementById('menu-btn').classList.add('hidden');
            document.getElementById('finish-btn').classList.add('hidden');
            
            // Trigger confetti
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            
            (function frame() {
                const timeLeft = animationEnd - Date.now();
                if (timeLeft <= 0) return;
                
                confetti({
                    particleCount: 3,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 }
                });
                confetti({
                    particleCount: 3,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 }
                });

                requestAnimationFrame(frame);
            }());
            
            const accuracy = correctAttempts + incorrectAttempts > 0 
                ? Math.round((correctAttempts / (correctAttempts + incorrectAttempts)) * 100) 
                : 0;
                
            const gameEndMessage = gameMode === 'hints'
                ? `Final Score: ${currentScore}<br>Countries Found: ${correctAttempts}`
                : gameMode === 'streak'
                ? `Game Over! Final Streak: ${currentStreak}<br>Best Streak: ${bestStreak}`
                : gameMode === 'time'
                ? `Final Score: ${currentScore}`
                : gameMode === 'alphabetic'
                ? `Congratulations! You completed the alphabetic challenge!`
                : `Congratulations! You found all ${foundCountries.size} countries!`;
                
            const overlay = document.getElementById('game-overlay');
            const startMenu = document.getElementById('start-menu');
            overlay.classList.remove('hidden');
            
            startMenu.innerHTML = `
                <div style="position: relative;">
                    <button style="position: absolute; top: 0; right: 0; background: none; border: none; font-size: 24px; cursor: pointer; padding: 10px;" 
                            onclick="closeEndGameOverlay()">×</button>
                    <h2>Game Over!</h2>
                    <p style="font-size: 24px; margin: 20px 0;">${gameEndMessage}</p>
                    
                    <div id="stats-container">
                        <div class="stat-box">
                            <div class="stat-label">Correct Attempts</div>
                            <div class="stat-value" style="color: #2ecc71;">${correctAttempts}</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-label">Incorrect Attempts</div>
                            <div class="stat-value" style="color: #e74c3c;">${incorrectAttempts}</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-label">Total Attempts</div>
                            <div class="stat-value">${correctAttempts + incorrectAttempts}</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-label">Accuracy</div>
                            <div class="stat-value">${accuracy}%</div>
                        </div>
                    </div>
                    
                    <button class="game-btn" onclick="showMainMenu()">Main Menu</button>
                   
                </div>
            `;

            // Hide streak counters
            document.getElementById('streak-counter').classList.add('hidden');
            document.getElementById('best-streak').classList.add('hidden');
            
            document.getElementById('hint-btn').classList.add('hidden');
            document.getElementById('hint-container').style.display = 'none';
            
            // Hide hints remaining text
            document.querySelector('.hints-left').style.display = 'none';
        }

        // Add new function to close end game overlay
        function closeEndGameOverlay() {
            document.getElementById('game-overlay').classList.add('hidden');
        }

        // Add some CSS for the end game overlay
        const styles = `
            #start-menu {
                position: relative;
                min-width: 300px;
                padding: 40px;
            }

            .close-btn {
                position: absolute;
                top: 10px;
                right: 10px;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                padding: 10px;
                color: #666;
                transition: color 0.3s;
            }

            .close-btn:hover {
                color: #000;
            }

            #game-overlay {
                background: rgba(0, 0, 0, 0.8);
            }
        `;

        const styleSheet = document.createElement("style");
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);

        // Remove the difficulty buttons from game controls div
        document.getElementById('game-controls').innerHTML = '';

        function showDifficultySelect(mode) {
            gameMode = mode;
            localStorage.setItem('selectedGameMode', mode); // Store the selected mode
            document.getElementById('game-modes').style.display = 'none';
            document.getElementById('difficulty-select').style.display = 'block';
            
            // Update difficulty select HTML to include Ultra
            document.getElementById('difficulty-select').innerHTML = `
                <button class="back-btn" onclick="showGameModes()">←</button>
                <h3>Select Difficulty</h3>
                <button class="game-btn" onclick="startGame('easy')">Easy</button>
                <button class="game-btn" onclick="startGame('normal')">Normal</button>
                <button class="game-btn" onclick="startGame('hard')">Hard</button>
                <button class="game-btn" style="background: #e74c3c" onclick="confirmUltraMode()">Ultra</button>
            `;
        }

        function showGameModes() {
            document.getElementById('game-modes').style.display = 'grid';
            document.getElementById('difficulty-select').style.display = 'none';
        }

        function showMainMenu() {
            // Reset game state
            clearInterval(gameTimer);
            isGameActive = false;
            currentScore = 0;
            correctAttempts = 0;
            incorrectAttempts = 0;
            
            document.getElementById('current-score').textContent = '0';
            document.getElementById('timer').textContent = 'Time: 3:00';
            
            // Reset map colors if in 'find all' mode
            if (gameMode === 'all') {
                geojsonLayer.eachLayer(function(layer) {
                    layer.setStyle({
                        fillColor: '#95a5a6',
                        fillOpacity: 0.2
                    });
                });
            }
            
            // Hide game buttons
            document.getElementById('menu-btn').classList.add('hidden');
            document.getElementById('finish-btn').classList.add('hidden');
            
            // Show main menu
            const overlay = document.getElementById('game-overlay');
            overlay.classList.remove('hidden');
            
            // Reset menu to show game modes
            const startMenu = document.getElementById('start-menu');
            startMenu.innerHTML = `
                <h2>Select Game Mode</h2>
                <div id="game-modes">
                    <div class="mode-card" onclick="showDifficultySelect('time')">
                        <div class="mode-title">Against Time ⏱️</div>
                        <div class="mode-description">Find as many countries as you can in 3 minutes!</div>
                    </div>
                    <div class="mode-card" onclick="showDifficultySelect('all')">
                        <div class="mode-title">Find All Countries 🌎</div>
                        <div class="mode-description">Take your time to find all countries in the selected region.</div>
                    </div>
                    <div class="mode-card" onclick="showDifficultySelect('alphabetic')">
                        <div class="mode-title">Alphabetic Challenge 🔤</div>
                        <div class="mode-description">Find countries in alphabetical order!</div>
                    </div>
                    <div class="mode-card" onclick="showDifficultySelect('streak')">
                        <div class="mode-title">Streak Mode 🔥</div>
                        <div class="mode-description">How many countries can you find in a row without mistakes?</div>
                    </div>
                    <div class="mode-card" onclick="showDifficultySelect('hints')">
                        <div class="mode-title">Hints Mode 💡</div>
                        <div class="mode-description">Use hints wisely to find countries! Limited hints per game.</div>
                    </div>
                </div>
                <div id="difficulty-select" class="difficulty-select">
                    <button class="back-btn" onclick="showGameModes()">←</button>
                    <h3>Select Difficulty</h3>
                    <button class="game-btn" onclick="startGame('easy')">Easy</button>
                    <button class="game-btn" onclick="startGame('normal')">Normal</button>
                    <button class="game-btn" onclick="startGame('hard')">Hard</button>
                    <button class="game-btn" style="background: #e74c3c" onclick="confirmUltraMode()">Ultra</button>
                </div>
            `;
            showGameModes();
        }

        // Add confirmation for Ultra mode
        function confirmUltraMode() {
            if (confirm('Ultra mode includes ALL countries in the world! Are you ready for this challenge?')) {
                startGame('ultra');
            }
        }

        // Add Ultra-specific messages
        const ultraSuccessMessages = [
            "GEOGRAPHY LEGEND! 🌍👑",
            "ULTRA INSTINCT ACTIVATED! 💫",
            "WORLD MASTER! 🌎",
            "ABSOLUTELY INCREDIBLE! 🔥",
            "ULTRA RARE FIND! ⭐",
            "MAP WIZARD IN THE HOUSE! 🗺️✨",
            "BIG BRAIN ENERGY! 🧠⚡",
            "EARTH EXPLORER LEVEL 100! 🌏🎮",
            "NEXT-LEVEL GENIUS! 🚀🔥",
            "EPIC WINNER VIBES! 🏆🌟",
            "LEGENDARY DISCOVERY UNLOCKED! 🔓✨",
            "CHAMPION OF THE WORLD! 🌎💪",
            "BOSS MODE ACTIVATED! 👑⚡",
            "RARE GEM SPOTTED! 💎🌟",
            "ABSOLUTE ICON! 🔥🌍",
        ];

        // Add hint-specific success messages
        const hintSuccessMessages = [
            "Detective Skills: 100% 🔍",
            "Puzzle Master! 🧩",
            "Brilliant Deduction! 🎯",
            "Geography Sleuth! 🗺️",
            "Case Solved! 🔎",
            "Clue Finder Extraordinaire! 💡",
            "Sharp as a Tack! 🦊",
            "Investigation Complete! ✅",
            "Mystery Unlocked! 🔓",
            "Trailblazer Award! 🛤️",
            "Map Detective! 🗺️🔍",
            "Nothing Escapes You! 🕵️‍♂️",
            "Piece of the Puzzle Found! 🧩✨",
            "Perfect Guess! 🎉",
            "Mind Games Champion! 🏆🧠"
        ];

        // Initialize with game modes view
        window.onload = function() {
            const storedMode = localStorage.getItem('selectedGameMode');
            const storedDifficulty = localStorage.getItem('selectedDifficulty');
            
            if (storedMode && storedDifficulty) {
                gameMode = storedMode;
                difficulty = storedDifficulty;
                
                // Clear storage so it doesn't auto-start next time
                localStorage.removeItem('selectedGameMode');
                localStorage.removeItem('selectedDifficulty');
                
                // Start the game with stored settings
                startGameWithoutRefresh(storedDifficulty);
            }
        }

        // Create a version of startGame that doesn't refresh
        function startGameWithoutRefresh(selectedDifficulty) {
            difficulty = selectedDifficulty;
            isGameActive = true;
            currentScore = 0;
            correctAttempts = 0;
            incorrectAttempts = 0;
            
            document.getElementById('game-overlay').classList.add('hidden');
            document.getElementById('menu-btn').classList.remove('hidden');
            document.getElementById('finish-btn').classList.remove('hidden');
            document.getElementById('feedback-btn').classList.remove('hidden');
            
            // Reset country pools
            usedCountries.clear();
            foundCountries.clear();
            availableCountries = [...countries[selectedDifficulty]];
            
            // Initialize map if not already done
            if (!map) {
                initMap();
            }
            
            if (gameMode === 'hints') {
                document.getElementById('timer').textContent = 'Hints Mode - Score: 0';
                document.getElementById('current-score').textContent = '0';
                document.getElementById('hint-btn').classList.add('hidden');
                
                // Select initial country and hint
                const randomCountry = availableCountries[Math.floor(Math.random() * availableCountries.length)];
                targetCountry = randomCountry;
                usedCountries.add(randomCountry);
                
                // Get hints for the country
                const hints = countryHints[targetCountry] || generateDefaultHint(targetCountry);
                const randomHint = hints[Math.floor(Math.random() * hints.length)];
                
                // Display the hint
                document.getElementById('country-to-find').innerHTML = `
                    <div style="font-size: 24px; margin-bottom: 10px;">🔍 Find this country:</div>
                    <div style="font-style: italic; color: #666;">"${randomHint}"</div>
                `;
            } else if (gameMode === 'streak') {
                currentStreak = 0;
                bestStreak = 0;
                document.getElementById('streak-counter').classList.remove('hidden');
                document.getElementById('best-streak').classList.remove('hidden');
                document.getElementById('current-streak').textContent = currentStreak;
                document.getElementById('max-streak').textContent = bestStreak;
                document.getElementById('timer').textContent = 'Streak Mode';
                document.getElementById('current-score').textContent = currentStreak;
                startNewRound();
            } else if (gameMode === 'alphabetic') {
                alphabeticIndex = 0;
                sortedCountries = [...countries[selectedDifficulty]].sort();
                targetCountry = sortedCountries[0];
                document.getElementById('timer').textContent = 'Alphabetic Mode';
                document.getElementById('current-score').textContent = `0/${sortedCountries.length}`;
                document.getElementById('country-to-find').innerHTML = `
                    ${targetCountry}
                    <div id="next-country">Next: ${sortedCountries[1] || 'Last country!'}</div>
                `;
            } else if (gameMode === 'time') {
                timeLeft = 180; // 3 minutes
                document.getElementById('timer').textContent = 'Time: 3:00';
                document.getElementById('current-score').textContent = '0';
                startTimer();
                startNewRound();
            } else {
                document.getElementById('timer').textContent = 'Find All Countries';
                document.getElementById('current-score').textContent = `0/${countries[selectedDifficulty].length}`;
                startNewRound();
            }
            
            map.setZoom(difficultyZoom[selectedDifficulty]);
            
            const hintBtn = document.getElementById('hint-btn');
            if (gameMode === 'hints') {
                console.log('Showing hint button'); // Debug log
                hintBtn.style.display = 'block';  // Explicitly set display
                hintBtn.classList.remove('hidden');
                hintsRemaining = 2;
                updateHintButton();
                document.getElementById('timer').textContent = 'Hints Mode';
            } else {
                hintBtn.style.display = 'none';  // Explicitly set display
                hintBtn.classList.add('hidden');
            }
            
            const surrenderBtn = document.getElementById('surrender-btn');
            if (gameMode === 'hints') {
                surrenderBtn.classList.remove('hidden');
            } else {
                surrenderBtn.classList.add('hidden');
            }
            
            const hintsLeftText = document.querySelector('.hints-left');
            if (gameMode === 'hints') {
                hintsLeftText.style.display = 'block';  // Show in hints mode
                hintBtn.classList.remove('hidden');
                hintsRemaining = 2;
                updateHintButton();
                document.getElementById('timer').textContent = 'Hints Mode';
            } else {
                hintsLeftText.style.display = 'none';  // Hide in other modes
                hintBtn.classList.add('hidden');
            }
        }

        function showStreakMessage(isSuccess) {
            const messageContainer = document.getElementById('message-container');
            let message;
            
            if (isSuccess) {
                if (currentStreak % 5 === 0) { // Show special message every 5 streaks
                    const randomMilestone = streakMessages.milestone[Math.floor(Math.random() * streakMessages.milestone.length)];
                    message = `${randomMilestone} ${currentStreak}!`;
                } else {
                    message = successMessages[Math.floor(Math.random() * successMessages.length)];
                }
            } else {
                const randomGameOver = streakMessages.gameOver[Math.floor(Math.random() * streakMessages.gameOver.length)];
                message = `${randomGameOver} ${currentStreak}`;
            }
            
            messageContainer.textContent = message;
            messageContainer.className = isSuccess ? 'success-message' : 'error-message';
            messageContainer.style.opacity = '1';

            setTimeout(() => {
                messageContainer.style.opacity = '0';
            }, 2000);
        }

        // Add hint-related variables
        let hintsRemaining = 3;
        let currentHint = '';

        function showHint() {
            if (hintsRemaining <= 0) return;
            
            const hints = countryHints[targetCountry] || [
                'A country waiting to be discovered',
                'Keep exploring!',
                'You\'re getting closer!'
            ];
            
            // Get next hint (hint index is 3 - hintsRemaining)
            const hintIndex = 3 - hintsRemaining;
            const currentHint = hints[hintIndex];
            
            // Add new hint while keeping previous hints
            const targetElement = document.getElementById('country-to-find');
            targetElement.innerHTML += 
                `<div style="font-size: 16px; color: #666; margin-top: 8px;">${currentHint}</div>`;
            
            hintsRemaining--;
            updateHintButton();
        }

        function updateHintButton() {
            const hintBtn = document.getElementById('hint-btn');
            if (hintBtn) {
                hintBtn.textContent = `Get Hint (${hintsRemaining})`;
                hintBtn.disabled = hintsRemaining <= 0;
                document.querySelector('.hints-left').textContent = `Hints remaining: ${hintsRemaining}`;
            }
        }

        // Helper functions for default hints
        function getRegion(country) {
            // This would need a proper database of country regions
            return "specific region"; // Placeholder
        }

        function getCapital(country) {
            // This would need a proper database of capitals
            return "capital city"; // Placeholder
        }

        function getPopulation(country) {
            // This would need a proper database of populations
            return "X million"; // Placeholder
        }

        function surrenderHint() {
            if (!isGameActive || gameMode !== 'hints') return;
            
            // Show the country name instead of hint
            document.getElementById('country-to-find').innerHTML = 
                `<div style="font-size: 24px; color: #e74c3c;">The country was: ${targetCountry}</div>`;
            
            // Highlight the country in yellow
            geojsonLayer.eachLayer(function(layer) {
                if (layer.feature.properties.ADMIN === targetCountry) {
                    layer.setStyle({
                        fillColor: '#f1c40f',
                        fillOpacity: 0.6,
                        color: '#000',
                        weight: 1
                    });
                }
            });
            
            // Disable buttons
            document.getElementById('hint-btn').classList.add('hidden');
            document.getElementById('surrender-btn').classList.add('hidden');
            
            // Show game over after a short delay
            setTimeout(() => {
                finishGame();
            }, 2000);
        }

import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import SVGIcon from 'grommet/components/SVGIcon';

import Box from 'grommet/components/Box';

const CSV = 'text/csv'; // TODO: change to exports somewhere

const XlsxFileIcon = () => (
  <SVGIcon viewBox="0 0 131 170"
    version='1.1'
    type='logo'
    a11yTitle='xlsx file type'>
    <g stroke="none"
      strokeWidth="1"
      fill="none"
      strokeLinejoin='round'>
      <path d="M94,1.49903453 L94,37 L129.493392,37 C129.819702,37.4920404 130,38.2554891 130,39.934 L130,166 C130,167.035 128.035,169 125.611,169 L5.389,169 C2.965,169 1,167.035 1,166 L1,6.778 C1,2.965 2.965,1 5.389,1 L92.455,1 C93.0125528,1 93.5529272,1.1775096 94,1.49903453 Z M94.2500322,1.70303217 C94.2740689,1.72521282 94.29773,1.74787105 94.321,1.771 L129.229,36.679 C129.251566,36.7017036 129.273684,36.7247795 129.295347,36.7483473 L94.2500322,1.70303217 Z M52,49 L52,37 L16,37 L16,49 L16,55 L16,61 L16,67 L16,73 L16,79 L16,85 L16,91 L16,103 L46,103 L52,103 L115,103 L115,91 L115,85 L115,79 L115,73 L115,67 L115,61 L115,49 L52,49 Z M22,43 L46,43 L46,49 L22,49 L22,43 Z M22,55 L46,55 L46,61 L22,61 L22,55 Z M22,67 L46,67 L46,73 L22,73 L22,67 Z M22,79 L46,79 L46,85 L22,85 L22,79 Z M46,97 L22,97 L22,91 L46,91 L46,97 Z M109,97 L52,97 L52,91 L109,91 L109,97 Z M109,85 L52,85 L52,79 L109,79 L109,85 Z M109,73 L52,73 L52,67 L109,67 L109,73 Z M52,61 L52,55 L109,55 L109,61 L52,61 Z M31.6694533,143.061194 C32.6205792,142.010447 33.5881028,140.959702 34.5720257,139.908955 C35.5559485,138.858208 36.5398713,137.98806 37.5237942,137.298507 L38.507717,137.298507 C39.1636135,137.167165 39.6145791,136.920896 39.8606109,136.559701 C40.1065916,136.198507 40.2295819,135.78806 40.2295819,135.328358 C40.2298131,134.704538 40.0166309,134.318718 39.5900321,134.170896 C39.1637756,134.023134 38.7046126,133.9 38.2125401,133.801493 C38.1475198,133.801493 38.0819244,133.793284 38.0157556,133.776866 C37.9506361,133.760447 37.8850408,133.752239 37.818971,133.752239 L32.3090032,133.752239 C31.4563131,133.752239 30.8249621,133.850746 30.4149517,134.047761 C30.0050449,134.24479 29.8000615,134.671655 29.8,135.328358 C29.7999129,136.182068 30.0376947,136.71565 30.513344,136.929104 C30.9889062,137.142538 31.6530541,137.265672 32.5057877,137.298507 L31.8416398,137.963433 C31.6612545,138.144029 31.489068,138.324627 31.3250803,138.505224 C31.1610927,138.68582 30.9889062,138.874627 30.8085209,139.071642 C30.6281355,139.268568 30.4231506,139.498418 30.1935691,139.761194 C29.8,140.188059 29.4392278,140.582089 29.111254,140.943284 C28.7832802,141.304478 28.422508,141.698508 28.0289389,142.125373 L25.8151125,139.810448 C25.4215434,139.383583 25.0197746,138.964926 24.609807,138.554478 C24.1998395,138.144029 23.7980707,137.725373 23.4045016,137.298507 C24.1588467,137.298972 24.781998,137.208673 25.273955,137.027612 C25.7659164,136.847015 26.0118971,136.379105 26.0118971,135.623881 C26.0118971,134.967164 25.8397106,134.52388 25.4953376,134.29403 C25.1509646,134.064346 24.6016074,133.88375 23.8472669,133.752239 L18.5340836,133.752239 C17.648553,133.751985 16.9188098,133.809447 16.3448553,133.924627 C15.7709001,134.039536 15.401929,134.425358 15.2379421,135.08209 C15.2379421,136.362687 15.877492,137.101493 17.1565916,137.298507 L18.1897106,137.298507 C19.501608,138.447751 20.74791,139.662676 21.9286173,140.943284 C23.109321,142.223881 24.2736299,143.504478 25.4215434,144.785075 C24.3392283,145.868657 23.2569132,147.001493 22.1745981,148.183582 C21.5842444,148.840298 21.0102891,149.472388 20.4527331,150.079851 C19.8951771,150.68731 19.3212219,151.270146 18.7308682,151.828358 C18.4356951,152.041789 18.0831225,152.255222 17.6731511,152.419403 C17.2631835,152.583583 16.8614148,152.731344 16.4678457,152.862687 C15.9102896,153.026865 15.4429263,153.207463 15.0657556,153.404478 C14.6885865,153.601493 14.5000008,153.929851 14.5,154.389552 C14.5,154.914926 14.5819938,155.259702 14.7459807,155.423881 C14.9099668,155.588059 15.1231499,155.752239 15.3855305,155.916418 C15.5823151,156.014925 15.7954981,156.179104 16.0250804,156.408955 L22.9617363,156.408955 C23.8144639,156.408955 24.4704122,156.326865 24.929582,156.162687 C25.3887224,155.998508 25.6183039,155.620896 25.6183279,155.029851 C25.6183339,153.61791 24.7164042,152.91194 22.9125402,152.91194 L22.3221865,152.91194 C22.8141456,152.353731 23.2405124,151.902239 23.6012861,151.557463 C23.9620448,151.212686 24.3884109,150.777611 24.8803858,150.252239 C25.3723375,149.726868 25.8560993,149.234331 26.331672,148.774627 C26.8071937,148.314934 27.2909562,147.805979 27.7829582,147.247761 C28.6356918,148.167158 29.4638258,149.037308 30.2673633,149.858209 C31.0709008,150.679104 31.915434,151.565671 32.8009646,152.51791 C32.8665599,152.583565 32.9239549,152.649237 32.9731511,152.714925 C33.0223472,152.780592 33.0797422,152.846263 33.1453376,152.91194 C31.8990513,152.977612 31.0791161,153.215672 30.6855305,153.626119 C30.2919614,154.036567 30.0951768,154.586567 30.0951768,155.276119 C30.455949,155.965672 31.1610927,156.343284 32.2106109,156.408955 L38.9504822,156.408955 C39.704747,156.343284 40.2295069,156.121642 40.5247588,155.74403 C40.8199356,155.366418 40.967524,154.947761 40.967524,154.48806 C40.9019302,154.258209 40.8199356,154.09403 40.7215433,153.995522 C40.786924,153.897015 40.8033247,153.831344 40.7707395,153.798507 C40.7370943,153.765671 40.7206966,153.732836 40.7215433,153.7 C40.5575572,153.502987 40.3525723,153.322389 40.1065916,153.158209 C39.8606109,152.994028 39.5572337,152.911938 39.196463,152.91194 L38.507717,152.91194 C37.6549954,152.222388 36.7366679,151.360448 35.7527331,150.326119 C34.7688102,149.29179 33.8176843,148.298506 32.8993569,147.346269 C32.4401909,146.853731 31.9892267,146.385821 31.546463,145.942537 C31.1036977,145.49926 30.6691313,145.047768 30.2427652,144.58806 C30.4722807,144.32541 30.7018622,144.070932 30.9315112,143.824627 C31.1610927,143.578358 31.4070734,143.323881 31.6694533,143.061194 Z M53.5508038,124 L52.0257235,124 C51.566559,124.065671 51.0991956,124.098507 50.6236334,124.098507 C50.1480787,124.098023 49.6643169,124.11444 49.1723473,124.147761 C48.7131835,124.180598 48.2212221,124.205225 47.696463,124.221642 C47.1717159,124.238059 46.696153,124.262686 46.2697749,124.295522 L45.9745981,124.295522 C45.1874598,124.393549 44.5397104,124.5331 44.0313505,124.714179 C43.5229929,124.894777 43.2196172,125.214926 43.1212219,125.674627 C43.1212219,126.42985 43.3016072,126.979851 43.6623794,127.324627 C44.0231486,127.669403 44.6790969,127.841791 45.6302251,127.841791 L46.7125402,127.841791 C47.2372993,127.841039 47.8030549,127.83283 48.4098071,127.817164 C49.0165472,127.800747 49.5659044,127.77612 50.0578778,127.743284 C50.2218362,127.744143 50.4104211,127.735933 50.6236334,127.718657 C50.8368172,127.703319 51.0254014,127.695109 51.1893891,127.69403 L51.1893891,152.123881 C51.1893891,152.48507 51.1483918,152.723129 51.0663987,152.83806 C50.9844056,152.952985 50.8286169,153.010448 50.5990354,153.010448 L50.2546624,153.010448 C50.1890678,153.010447 50.107074,153.002238 50.0086817,152.985821 C49.9102894,152.969426 49.8118971,152.961217 49.7135048,152.961194 L45.236656,152.961194 C44.3511254,152.961194 43.6131833,153.067911 43.0228296,153.281343 C42.4324759,153.494776 42.1372991,153.929851 42.1372991,154.586567 C42.1372983,155.473134 42.3996775,155.998508 42.9244373,156.162687 C43.4491949,156.326866 44.1215424,156.408955 44.9414791,156.408955 L61.1270096,156.408955 C61.4877818,156.408954 61.8403537,156.400745 62.1847267,156.384328 C62.5290306,156.367911 62.8406051,156.302239 63.1194533,156.187313 C63.3982325,156.072388 63.6278125,155.9 63.8081993,155.670149 C63.9885862,155.440298 64.0787781,155.095522 64.0787781,154.635821 C64.0788682,153.519403 63.258933,152.961194 61.618971,152.961194 L55.7646302,152.961194 C55.5350487,152.961194 55.3710611,152.92015 55.2726688,152.83806 C55.1742765,152.75597 55.1250804,152.51791 55.1250804,152.123881 L55.1250804,126.216418 C55.1251915,125.461369 55.0186003,124.927788 54.8053054,124.615672 C54.5921217,124.303792 54.1739545,124.098568 53.5508038,124 Z M84.7794212,150.00597 C84.7794212,150.56418 84.6072347,151.064926 84.2628617,151.508209 C83.9185143,151.951491 83.4675501,152.329102 82.9099678,152.641045 C82.3524471,152.952985 81.6964981,153.191045 80.9421222,153.355224 C80.1877809,153.519403 79.4006426,153.601493 78.5807074,153.601493 C77.6951769,153.601493 76.8424432,153.511194 76.0225081,153.330597 C75.2025691,153.15 74.4728266,152.887313 73.8332798,152.542537 C73.1937299,152.197763 72.6689708,151.787314 72.2590032,151.311194 C71.8490356,150.835078 71.5948553,150.301496 71.4964631,149.710448 C71.2996785,149.053738 71.0290997,148.577618 70.6847267,148.28209 C70.3403537,147.986567 69.8729904,147.838806 69.2826367,147.838806 C68.7250799,147.838806 68.3479093,148.035821 68.1511254,148.429851 C67.9543409,148.823878 67.8559486,149.332833 67.8559486,149.956716 L67.8559486,154.192537 C67.8559486,155.079104 68.0773312,155.538806 68.5200965,155.571642 C68.9628618,155.604478 69.5122182,155.522388 70.1681672,155.325373 C70.3321278,155.292537 70.5207128,155.243283 70.7339229,155.177612 C70.9470759,155.111941 71.1356608,155.062687 71.2996785,155.029851 C72.2507984,155.686567 73.349512,156.179104 74.59582,156.507463 C75.8421159,156.835821 77.2032094,157 78.6790997,157 C80.122187,157 81.4668805,156.84403 82.7131833,156.53209 C83.959486,156.22015 85.0336008,155.760448 85.9355305,155.152985 C86.8374603,154.545523 87.5508043,153.790299 88.0755627,152.887313 C88.6003225,151.984328 88.8627009,150.958209 88.8627009,149.808955 C88.8626979,148.528358 88.6003195,147.49403 88.0755627,146.70597 C87.5508043,145.91791 86.8292599,145.277612 85.9109325,144.785075 C84.992605,144.292537 83.9184887,143.906717 82.6885852,143.627612 C81.4586817,143.348508 80.1385847,143.077612 78.7282958,142.814925 C78.4659985,142.749253 78.1790205,142.699999 77.8673634,142.667164 C77.659664,142.645274 77.3726865,142.59602 77.0064309,142.519403 C75.4321574,142.223881 74.2596488,141.879104 73.4889068,141.485075 C72.718173,141.091054 72.3328035,140.532844 72.3327975,139.810448 C72.3327975,139.285098 72.4803859,138.825396 72.7755627,138.431343 C73.0707411,138.037313 73.4725098,137.708956 73.9808682,137.446269 C74.4892281,137.183582 75.0795818,136.978358 75.7519293,136.830597 C76.4242445,136.682836 77.1211894,136.608955 77.8427653,136.608955 C79.7122187,136.608955 81.0651125,136.847015 81.9014469,137.323134 C82.7377813,137.799253 83.3363339,138.497015 83.6971061,139.416418 C83.6971061,139.481965 83.705305,139.539427 83.7217042,139.588806 C83.7381034,139.637968 83.7463022,139.69543 83.7463022,139.761194 C83.8118976,140.122389 83.9430868,140.467165 84.1398714,140.795522 C84.3366559,141.12388 84.7138259,141.337313 85.2713826,141.435821 L85.6649518,141.435821 C86.4192931,141.435821 86.9276522,141.13209 87.1900321,140.524627 C87.4524121,139.917164 87.5836013,138.989553 87.5836013,137.741791 C87.5848819,137.511947 87.5766831,137.232843 87.5590032,136.904478 C87.542604,136.576212 87.4934078,136.272481 87.4114148,135.993284 C87.3294217,135.714291 87.2064314,135.484441 87.0424437,135.303731 C86.8786347,135.123218 86.665451,135.065755 86.4028939,135.131343 C86.3375613,135.164179 86.2473678,135.197015 86.1323151,135.229851 C86.0176527,135.262686 85.9110616,135.295523 85.8125402,135.328358 C85.6485525,135.295523 85.4763661,135.246269 85.2959807,135.180597 L84.4842444,134.885075 C84.0250799,134.671641 83.5085204,134.491045 82.9345659,134.29403 C82.3606114,134.097015 81.7784566,133.916418 81.1881029,133.752239 C80.5977492,133.588059 80.0155944,133.448508 79.4416399,133.333582 C78.8676854,133.218656 78.3347267,133.161194 77.8427653,133.161194 C76.4652793,133.161194 75.1943793,133.325374 74.0300643,133.653731 C72.8657592,133.982089 71.8654379,134.441791 71.0290997,135.032836 C70.1927706,135.623881 69.5450211,136.329851 69.0858521,137.150746 C68.6266891,137.971641 68.3971076,138.891045 68.3971061,139.908955 C68.3971061,141.156693 68.6430869,142.158186 69.1350483,142.913433 C69.6270097,143.668656 70.3157557,144.27612 71.2012862,144.735821 C72.0868092,145.195522 73.1281278,145.556717 74.3252412,145.819403 C75.5223418,146.082089 76.8260395,146.328358 78.2363344,146.558209 C78.5642211,146.62388 78.8921949,146.681343 79.2202572,146.730597 C79.548231,146.779851 79.892604,146.837314 80.2533762,146.902985 C81.6636651,147.165671 82.7705783,147.518657 83.5741158,147.96194 C84.3776532,148.405218 84.7794212,149.086561 84.7794212,150.00597 Z M107.201929,143.061194 C108.153055,142.010447 109.120579,140.959702 110.104502,139.908955 C111.088424,138.858208 112.072347,137.98806 113.05627,137.298507 L114.040193,137.298507 C114.696089,137.167165 115.147055,136.920896 115.393087,136.559701 C115.639068,136.198507 115.762058,135.78806 115.762058,135.328358 C115.762289,134.704538 115.549107,134.318718 115.122508,134.170896 C114.696252,134.023134 114.237089,133.9 113.745016,133.801493 C113.679996,133.801493 113.6144,133.793284 113.548232,133.776866 C113.483112,133.760447 113.417517,133.752239 113.351447,133.752239 L107.841479,133.752239 C106.988789,133.752239 106.357438,133.850746 105.947428,134.047761 C105.537521,134.24479 105.332537,134.671655 105.332476,135.328358 C105.332389,136.182068 105.570171,136.71565 106.04582,136.929104 C106.521382,137.142538 107.18553,137.265672 108.038264,137.298507 L107.374116,137.963433 C107.19373,138.144029 107.021544,138.324627 106.857556,138.505224 C106.693569,138.68582 106.521382,138.874627 106.340997,139.071642 C106.160611,139.268568 105.955627,139.498418 105.726045,139.761194 C105.332476,140.188059 104.971704,140.582089 104.64373,140.943284 C104.315756,141.304478 103.954984,141.698508 103.561415,142.125373 L101.347588,139.810448 C100.954019,139.383583 100.552251,138.964926 100.142283,138.554478 C99.7323154,138.144029 99.3305467,137.725373 98.9369775,137.298507 C99.6913226,137.298972 100.314474,137.208673 100.806431,137.027612 C101.298392,136.847015 101.544373,136.379105 101.544373,135.623881 C101.544373,134.967164 101.372187,134.52388 101.027814,134.29403 C100.683441,134.064346 100.134083,133.88375 99.3797428,133.752239 L94.0665595,133.752239 C93.181029,133.751985 92.4512857,133.809447 91.8773313,133.924627 C91.303376,134.039536 90.934405,134.425358 90.7704181,135.08209 C90.7704181,136.362687 91.4099679,137.101493 92.6890676,137.298507 L93.7221866,137.298507 C95.0340839,138.447751 96.2803859,139.662676 97.4610933,140.943284 C98.6417969,142.223881 99.8061059,143.504478 100.954019,144.785075 C99.8717042,145.868657 98.7893891,147.001493 97.707074,148.183582 C97.1167203,148.840298 96.5427651,149.472388 95.9852091,150.079851 C95.427653,150.68731 94.8536978,151.270146 94.2633441,151.828358 C93.968171,152.041789 93.6155984,152.255222 93.2056271,152.419403 C92.7956595,152.583583 92.3938907,152.731344 92.0003216,152.862687 C91.4427656,153.026865 90.9754022,153.207463 90.5982316,153.404478 C90.2210624,153.601493 90.0324767,153.929851 90.032476,154.389552 C90.032476,154.914926 90.1144698,155.259702 90.2784567,155.423881 C90.4424428,155.588059 90.6556258,155.752239 90.9180065,155.916418 C91.1147911,156.014925 91.3279741,156.179104 91.5575563,156.408955 L98.4942123,156.408955 C99.3469399,156.408955 100.002888,156.326865 100.462058,156.162687 C100.921198,155.998508 101.15078,155.620896 101.150804,155.029851 C101.15081,153.61791 100.24888,152.91194 98.4450161,152.91194 L97.8546624,152.91194 C98.3466216,152.353731 98.7729884,151.902239 99.1337621,151.557463 C99.4945208,151.212686 99.9208869,150.777611 100.412862,150.252239 C100.904813,149.726868 101.388575,149.234331 101.864148,148.774627 C102.33967,148.314934 102.823432,147.805979 103.315434,147.247761 C104.168168,148.167158 104.996302,149.037308 105.799839,149.858209 C106.603377,150.679104 107.44791,151.565671 108.333441,152.51791 C108.399036,152.583565 108.456431,152.649237 108.505627,152.714925 C108.554823,152.780592 108.612218,152.846263 108.677814,152.91194 C107.431527,152.977612 106.611592,153.215672 106.218006,153.626119 C105.824437,154.036567 105.627653,154.586567 105.627653,155.276119 C105.988425,155.965672 106.693569,156.343284 107.743087,156.408955 L114.482958,156.408955 C115.237223,156.343284 115.761983,156.121642 116.057235,155.74403 C116.352412,155.366418 116.5,154.947761 116.5,154.48806 C116.434406,154.258209 116.352412,154.09403 116.254019,153.995522 C116.3194,153.897015 116.335801,153.831344 116.303215,153.798507 C116.26957,153.765671 116.253173,153.732836 116.254019,153.7 C116.090033,153.502987 115.885048,153.322389 115.639068,153.158209 C115.393087,152.994028 115.08971,152.911938 114.728939,152.91194 L114.040193,152.91194 C113.187471,152.222388 112.269144,151.360448 111.285209,150.326119 C110.301286,149.29179 109.35016,148.298506 108.431833,147.346269 C107.972667,146.853731 107.521703,146.385821 107.078939,145.942537 C106.636174,145.49926 106.201607,145.047768 105.775241,144.58806 C106.004757,144.32541 106.234338,144.070932 106.463987,143.824627 C106.693569,143.578358 106.939549,143.323881 107.201929,143.061194 Z" id="xlsx" stroke="#7ED321" strokeWidth="1.5" fill="#7ED321" fillRule="nonzero" />
    </g>
  </SVGIcon>
)

const CsvFileIcon = () => (
  <SVGIcon viewBox='0 0 131 170'
    version='1.1'
    type='logo'
    a11yTitle='csv file type'>
    <g stroke='none'
      strokeWidth='1'
      fill='none'
      strokeLinejoin='round'>
      <path d="M94,1.49903453 L94,37 L129.493392,37 C129.819702,37.4920404 130,38.2554891 130,39.934 L130,166 C130,167.035 128.035,169 125.611,169 L5.389,169 C2.965,169 1,167.035 1,166 L1,6.778 C1,2.965 2.965,1 5.389,1 L92.455,1 C93.0125528,1 93.5529272,1.1775096 94,1.49903453 Z M94.2500322,1.70303217 C94.2740689,1.72521282 94.29773,1.74787105 94.321,1.771 L129.229,36.679 C129.251566,36.7017036 129.273684,36.7247795 129.295347,36.7483473 L94.2500322,1.70303217 Z M52,49 L52,37 L16,37 L16,49 L16,55 L16,61 L16,67 L16,73 L16,79 L16,85 L16,91 L16,103 L46,103 L52,103 L115,103 L115,91 L115,85 L115,79 L115,73 L115,67 L115,61 L115,49 L52,49 Z M22,43 L46,43 L46,49 L22,49 L22,43 Z M22,55 L46,55 L46,61 L22,61 L22,55 Z M22,67 L46,67 L46,73 L22,73 L22,67 Z M22,79 L46,79 L46,85 L22,85 L22,79 Z M46,97 L22,97 L22,91 L46,91 L46,97 Z M109,97 L52,97 L52,91 L109,91 L109,97 Z M109,85 L52,85 L52,79 L109,79 L109,85 Z M109,73 L52,73 L52,67 L109,67 L109,73 Z M52,61 L52,55 L109,55 L109,61 L52,61 Z M50.1219008,148.834711 L50.1735537,148.628099 C50.1046842,148.11157 49.9238991,147.672521 49.6311983,147.31095 C49.3384976,146.949385 49.0027538,146.648076 48.6239669,146.407025 C48.2451785,146.510331 47.806129,146.708334 47.3068182,147.001033 C46.8075074,147.293732 46.2995868,147.629476 45.7830579,148.008264 C45.4387058,148.249311 45.102962,148.47314 44.7758264,148.679752 C44.4486909,148.886362 44.1129471,149.075755 43.768595,149.247934 C43.0798877,149.557851 42.3481389,149.798898 41.5733471,149.971074 C40.7985695,150.14325 39.9635149,150.229339 39.0681818,150.229339 C37.7940777,150.229339 36.6146694,150.022727 35.5299587,149.609504 C34.4452479,149.196281 33.5154959,148.602273 32.7407025,147.827479 C31.965917,147.052686 31.3546913,146.140151 30.9070248,145.089876 C30.4593772,144.039608 30.2355482,142.8602 30.2355372,141.551653 C30.2355372,140.311989 30.4421488,139.158408 30.8553719,138.090909 C31.2685832,137.023417 31.8453741,136.093664 32.5857438,135.301653 C33.3260946,134.509641 34.2128028,133.889807 35.2458678,133.442149 C36.2789225,132.994489 37.4325043,132.77066 38.7066116,132.770661 C40.3250694,132.839466 41.6680446,133.235471 42.7355372,133.958678 C43.8029998,134.681818 44.4400527,135.559917 44.6466942,136.592975 L44.6466942,136.954545 C44.75,137.643251 45.0340909,138.15978 45.4989669,138.504132 C45.963843,138.848484 46.5061983,139.020661 47.1260331,139.020661 C48.0213504,138.88296 48.5637058,138.478345 48.7530992,137.806818 C48.9424942,137.135331 49.0371901,136.231405 49.0371901,135.095041 C49.0375905,134.4408 49.0203739,133.803747 48.9855372,133.183884 C48.9513026,132.56405 48.8393886,132.013086 48.6497934,131.530992 C48.4604,131.048898 48.1763091,130.670111 47.7975207,130.394628 C47.4187323,130.119145 46.9022033,129.981405 46.2479339,129.981405 C45.8347107,129.981405 45.4731405,130.136364 45.1632231,130.446281 C44.6122595,130.342975 44.1387736,130.231061 43.7427686,130.110537 C43.3467636,129.990013 42.907714,129.860881 42.4256198,129.72314 C41.8230033,129.516619 41.1859504,129.344442 40.5661157,129.206612 C39.946281,129.069019 39.2575752,129.000148 38.5,129 C36.7093669,129.068803 35.0564736,129.413155 33.5413223,130.033058 C32.0261711,130.652886 30.7090223,131.513767 29.589876,132.615702 C28.4707306,133.717631 27.5926314,135.03478 26.9555785,136.567149 C26.3185272,138.099517 26.0000016,139.795455 26,141.654959 C25.9999984,143.376722 26.3013075,144.98657 26.9039256,146.484504 C27.5065422,147.982438 28.3588149,149.290978 29.4607438,150.410124 C30.5626703,151.52927 31.8884282,152.407369 33.4380165,153.044421 C34.987597,153.681474 36.7093606,154 38.6033058,154 C39.8773863,154 41.1601003,153.845041 42.4514463,153.535124 C43.7427686,153.225207 44.913567,152.829201 45.963843,152.347107 C47.014119,151.865014 47.9180446,151.31405 48.6756198,150.694215 C49.4331966,150.07438 49.9152893,149.454545 50.1219008,148.834711 Z M71.3914143,146.665289 C71.3914143,147.250689 71.2106291,147.775827 70.8490589,148.240702 C70.4875154,148.705577 70.0140311,149.101582 69.4286044,149.428719 C68.8432422,149.755854 68.1545365,150.00551 67.3624887,150.177686 C66.5704771,150.349862 65.7440308,150.43595 64.8831498,150.43595 C63.9533977,150.43595 63.0580804,150.341254 62.1971994,150.15186 C61.3363144,149.962465 60.5701301,149.686983 59.8986457,149.325413 C59.2271581,148.963845 58.6761936,148.533403 58.2457531,148.034091 C57.8153126,147.534783 57.5484391,146.97521 57.4451333,146.355372 C57.2385217,145.666673 56.9544308,145.167362 56.5928606,144.857438 C56.2312903,144.547521 55.7405878,144.392562 55.1207531,144.392562 C54.5353531,144.392562 54.1393474,144.599174 53.9327366,145.012397 C53.726125,145.425617 53.6228192,145.959364 53.6228192,146.613636 L53.6228192,151.055785 C53.6228192,151.985537 53.8552572,152.467631 54.3201333,152.502066 C54.7850093,152.536502 55.3617994,152.450413 56.0505052,152.243802 C56.2226536,152.209366 56.4206561,152.157713 56.6445134,152.088843 C56.8683109,152.019973 57.0663133,151.96832 57.2385217,151.933884 C58.2371385,152.622589 59.3907195,153.139118 60.6992655,153.483471 C62.0077989,153.827824 63.4368625,154 64.9864556,154 C66.5016076,154 67.9134523,153.836432 69.2219928,153.509298 C70.5305333,153.182163 71.658287,152.700069 72.6052572,152.063017 C73.5522275,151.425964 74.3011944,150.633954 74.8521581,149.686983 C75.4031233,148.740013 75.6786044,147.663912 75.6786044,146.458678 C75.6786012,145.115702 75.4031202,144.030992 74.8521581,143.204545 C74.3011944,142.378099 73.5436176,141.706612 72.5794308,141.190083 C71.615244,140.673554 70.4874887,140.26894 69.1961663,139.97624 C67.904844,139.68354 66.5188242,139.39945 65.0381085,139.123967 C64.7627126,139.055096 64.4614035,139.003443 64.1341829,138.969008 C63.8070757,138.934574 63.4885501,138.882921 63.1786044,138.81405 C61.5773678,138.504132 60.3463067,138.142562 59.5370754,137.729339 C58.7278528,137.316125 58.3232388,136.730725 58.3232325,135.97314 C58.3232325,135.4222 58.4781911,134.940106 58.7881085,134.52686 C59.0980274,134.113636 59.5198596,133.769284 60.0536044,133.493802 C60.5873506,133.218319 61.2071854,133.003099 61.9131085,132.84814 C62.6189977,132.693182 63.3507465,132.615702 64.1083564,132.615702 C66.0711663,132.615702 67.4916209,132.865359 68.3697201,133.364669 C69.2478192,133.86398 69.8762622,134.595731 70.2550506,135.559917 C70.2550506,135.628658 70.2636589,135.688919 70.2808771,135.740702 C70.2980952,135.792259 70.3067035,135.85252 70.3067035,135.921488 C70.3755746,136.300276 70.5133151,136.661846 70.7199267,137.006198 C70.9265382,137.35055 71.3225432,137.57438 71.9079432,137.677686 L72.3211663,137.677686 C73.1131779,137.677686 73.6469234,137.35916 73.922406,136.722107 C74.1978886,136.085055 74.3356291,135.112259 74.3356291,133.803719 C74.3369737,133.562679 74.3283655,133.26998 74.3098027,132.92562 C74.2925845,132.581364 74.2409317,132.262838 74.154844,131.970041 C74.0687564,131.677459 73.9396242,131.436412 73.7674473,131.246901 C73.5954581,131.057594 73.3716284,130.997333 73.0959597,131.066116 C73.0273645,131.10055 72.932667,131.134987 72.8118688,131.169421 C72.6914804,131.203856 72.5795664,131.238293 72.476125,131.272727 C72.3039482,131.238293 72.1231631,131.18664 71.9337696,131.117769 L71.0814969,130.807851 C70.5994027,130.584022 70.0570474,130.394628 69.4544308,130.188017 C68.8518142,129.981405 68.2405878,129.792012 67.6207531,129.619835 C67.0009184,129.447658 66.389692,129.301309 65.7870754,129.180785 C65.1844589,129.060261 64.6248853,129 64.1083564,129 C62.6620817,129 61.3277156,129.172177 60.1052572,129.516529 C58.8828091,129.860881 57.8325339,130.342975 56.9544308,130.96281 C56.0763371,131.582645 55.3962405,132.323003 54.9141415,133.183884 C54.4320489,134.044765 54.1910026,135.008954 54.191001,136.076446 C54.191001,137.384962 54.4492655,138.435238 54.9657944,139.227273 C55.4823234,140.019283 56.2054639,140.656336 57.1352159,141.13843 C58.0649601,141.620523 59.1582799,141.999312 60.4151746,142.274793 C61.6720559,142.550275 63.0408575,142.80854 64.5215796,143.049587 C64.8658402,143.118457 65.2101923,143.178719 65.5546374,143.230372 C65.8989895,143.282025 66.2605598,143.342287 66.6393482,143.411157 C68.1200639,143.686639 69.282254,144.056818 70.1259184,144.521694 C70.9695828,144.986564 71.3914143,145.701095 71.3914143,146.665289 Z M94.7786963,149.71281 C95.32966,148.507575 95.8720153,147.259298 96.4057624,145.967975 C96.9395095,144.676653 97.4990815,143.307851 98.0844814,141.86157 C98.4632698,140.931821 98.8506665,139.99346 99.2466715,139.046488 C99.6426213,138.099517 100.064453,137.109504 100.512167,136.076446 C100.581038,135.938706 100.624081,135.809574 100.6413,135.68905 C100.658518,135.568526 100.701561,135.439393 100.770432,135.301653 C100.942609,134.819559 101.132002,134.371901 101.338614,133.958678 C101.545124,133.545455 101.941131,133.338843 102.52663,133.338843 L102.939853,133.338843 C103.594124,133.339031 104.12787,133.218507 104.541093,132.977273 C104.954316,132.736226 105.160928,132.219697 105.160928,131.427686 C105.160928,130.635674 104.894053,130.136364 104.360308,129.929752 C103.826562,129.72314 103.112029,129.619835 102.216713,129.619835 L95.398531,129.619835 C94.0555558,129.826446 93.3840682,130.497934 93.3840682,131.634298 C93.3840682,132.322992 93.6165062,132.77926 94.0813823,133.003099 C94.5462394,133.226812 95.1574658,133.338726 95.9150599,133.338843 L97.6712583,133.338843 C96.775941,135.542699 95.9236682,137.617425 95.1144401,139.563017 C94.305212,141.508605 93.4357211,143.58333 92.505969,145.78719 C92.2649227,146.372588 92.0238748,146.923552 91.7828285,147.440083 C91.622131,147.784434 91.3466489,148.266528 90.9563823,148.886364 C89.8544518,146.303719 88.7611328,143.738293 87.6764236,141.190083 C86.5917128,138.641873 85.498393,136.024793 84.3964649,133.338843 L85.9460517,133.338843 C87.3578822,133.338843 88.0638053,132.667355 88.0638203,131.32438 C88.0294021,130.945592 87.857226,130.566805 87.5472914,130.188017 C87.237374,129.809228 86.6175393,129.619835 85.6877872,129.619835 L78.9729112,129.619835 C77.9398533,129.619835 77.2339302,129.80062 76.8551426,130.16219 C76.476355,130.52376 76.2869608,131.066116 76.2869608,131.789256 C76.4247013,132.546831 76.8207071,132.994491 77.4749773,133.132231 C78.1292475,133.269972 78.955693,133.338843 79.9543161,133.338843 C80.5397161,134.64739 81.0906798,135.921494 81.6072087,137.161157 L83.1567955,140.880165 C84.0176773,142.980716 84.8613409,145.003787 85.6877872,146.94938 C86.5142154,148.894972 87.2717914,150.470386 87.9605145,151.67562 C87.9605145,151.778926 88.0121674,151.882231 88.1154732,151.985537 C88.3564958,152.433196 88.6233686,152.811983 88.916093,153.121901 C89.2087922,153.431818 89.7024378,153.536723 90.3882004,153.586777 C92.1411133,153.714722 93.134412,152.674242 93.3582418,152.39876 C93.5820715,152.123278 93.8058996,151.761708 94.0297294,151.31405 C94.2535591,150.866391 94.5032137,150.332645 94.7786963,149.71281 Z" id="csv" stroke="#F36FA0" strokeWidth="1.5" fill="#F36FA0" fillRule="nonzero" />
    </g>
  </SVGIcon>
)

class FileDrop extends Component {
  constructor(props) {
    super(props);
    this.handleDrop = this.handleDrop.bind(this);
    this.state = {
      full: false,
      mode: props.mode,
      file: props.file
    }
  }

  handleDrop([file]) {
    const isAccepted = this.props.onDrop(file);
    this.setState({ file, full: isAccepted} );
  }

  renderFileIcon() {
    if (this.state.mode === CSV) return <CsvFileIcon />;
    return <XlsxFileIcon />
  }

  renderDropZone() {
    return (
      <Dropzone
        onDrop={this.handleDrop}
        multiple={false}
        style={{borderWidth: '2px', borderColor: 'rgb(102, 102, 102)', borderStyle: 'dashed', borderRadius: '5px', height: '98px', width: '96px'}}>
        <Box align="center" justify="center" alignContent="center" margin="none" pad="none">
          <div>File</div>
        </Box>
      </Dropzone>
    )
  }

  render() {
    if (this.state.full) return this.renderFileIcon();
    else return this.renderDropZone();
  }
}

FileDrop.propTypes = {
  mode: PropTypes.string,
  onDrop: PropTypes.func.isRequired
}

export default FileDrop;

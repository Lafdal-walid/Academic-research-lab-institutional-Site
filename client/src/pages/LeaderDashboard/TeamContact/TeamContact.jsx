import React, { useState, useEffect, useRef } from 'react';
import NewChatModal from './NewChatModal';

const svgPaths = {
  searchNormal: "M9.58333 17.5C13.9556 17.5 17.5 13.9556 17.5 9.58333C17.5 5.21108 13.9556 1.66667 9.58333 1.66667C5.21108 1.66667 1.66667 5.21108 1.66667 9.58333C1.66667 13.9556 5.21108 17.5 9.58333 17.5Z",
  searchNormal2: "M18.3333 18.3333L16.6667 16.6667",
  barsSort: "M20 2.5C20 2.95833 19.625 3.33333 19.1667 3.33333H0.833333C0.375 3.33333 -2.98023e-07 2.95833 -2.98023e-07 2.5C-2.98023e-07 2.04167 0.375 1.66667 0.833333 1.66667H19.1667C19.625 1.66667 20 2.04167 20 2.5ZM5.83333 16.6667H0.833333C0.375 16.6667 -2.98023e-07 17.0417 -2.98023e-07 17.5C-2.98023e-07 17.9583 0.375 18.3333 0.833333 18.3333H5.83333C6.29167 18.3333 6.66667 17.9583 6.66667 17.5C6.66667 17.0417 6.29167 16.6667 5.83333 16.6667ZM12.5 9.16667H0.833333C0.375 9.16667 -2.98023e-07 9.54167 -2.98023e-07 10C-2.98023e-07 10.4583 0.375 10.8333 0.833333 10.8333H12.5C12.9583 10.8333 13.3333 10.4583 13.3333 10C13.3333 9.54167 12.9583 9.16667 12.5 9.16667Z",
  filterList: "M15 4.93333C15 3.13167 13.535 1.66667 11.7333 1.66667H3.26667C1.465 1.66667 0 3.13167 0 4.93333C0 5.7125 0.279167 6.4675 0.786667 7.05917L5 11.975V15C5 15.2625 5.12333 15.5092 5.33333 15.6667L8.66667 18.1667C8.81417 18.2767 8.99 18.3333 9.16667 18.3333C9.29333 18.3333 9.42167 18.3042 9.53917 18.2458C9.82167 18.105 10 17.8158 10 17.5V11.975L14.2133 7.05917C14.7208 6.4675 15 5.7125 15 4.93333ZM12.9483 5.975L8.53417 11.125C8.405 11.2758 8.33333 11.4683 8.33333 11.6675V15.8342L6.66667 14.5842V11.6675C6.66667 11.4683 6.59583 11.2758 6.46583 11.125L2.05167 5.97417C1.80333 5.68417 1.66667 5.31417 1.66667 4.9325C1.66667 4.05 2.38417 3.3325 3.26667 3.3325H11.7333C12.6158 3.3325 13.3333 4.05 13.3333 4.9325C13.3333 5.31417 13.1967 5.685 12.9483 5.975ZM20 16.6675C20 17.1275 19.6267 17.5008 19.1667 17.5008H12.5C12.04 17.5008 11.6667 17.1275 11.6667 16.6675C11.6667 16.2075 12.04 15.8342 12.5 15.8342H19.1667C19.6267 15.8342 20 16.2075 20 16.6675ZM20 13.3342C20 13.7942 19.6267 14.1675 19.1667 14.1675H12.5C12.04 14.1675 11.6667 13.7942 11.6667 13.3342C11.6667 12.8742 12.04 12.5008 12.5 12.5008H19.1667C19.6267 12.5008 20 12.8742 20 13.3342ZM15 9.1675H19.1667C19.6267 9.1675 20 9.54083 20 10.0008C20 10.4608 19.6267 10.8342 19.1667 10.8342H15C14.54 10.8342 14.1667 10.4608 14.1667 10.0008C14.1667 9.54083 14.54 9.1675 15 9.1675Z",
  calendarClock: "M14.1667 8.36583C10.9508 8.36583 8.33333 10.9825 8.33333 14.1992C8.33333 17.3975 10.9508 20 14.1667 20C17.3825 20 20 17.3833 20 14.1667C20 10.9683 17.3825 8.36583 14.1667 8.36583ZM14.1667 18.3333C11.8692 18.3333 10 16.4783 10 14.1992C10 11.9017 11.8692 10.0325 14.1667 10.0325C16.4642 10.0325 18.3333 11.8875 18.3333 14.1667C18.3333 16.4642 16.4642 18.3333 14.1667 18.3333ZM15.5892 14.4108C15.915 14.7367 15.915 15.2633 15.5892 15.5892C15.4267 15.7517 15.2133 15.8333 15 15.8333C14.7867 15.8333 14.5733 15.7517 14.4108 15.5892L13.5775 14.7558C13.4208 14.5992 13.3333 14.3875 13.3333 14.1667V12.5C13.3333 12.04 13.7058 11.6667 14.1667 11.6667C14.6275 11.6667 15 12.04 15 12.5V13.8217L15.5892 14.4108ZM20 5.83333V7.5C20 7.96 19.6275 8.33333 19.1667 8.33333C18.7058 8.33333 18.3333 7.96 18.3333 7.5V5.83333C18.3333 4.455 17.2117 3.33333 15.8333 3.33333H4.16667C2.78833 3.33333 1.66667 4.455 1.66667 5.83333V6.66667H9.16667C9.62667 6.66667 10 7.04 10 7.5C10 7.96 9.62667 8.33333 9.16667 8.33333H1.66667V15.8333C1.66667 17.2117 2.78833 18.3333 4.16667 18.3333H7.5C7.96 18.3333 8.33333 18.7067 8.33333 19.1667C8.33333 19.6267 7.96 20 7.5 20H4.16667C1.86917 20 0 18.1308 0 15.8333V5.83333C0 3.53583 1.86917 1.66667 4.16667 1.66667H5V0.833333C5 0.373333 5.37333 0 5.83333 0C6.29333 0 6.66667 0.373333 6.66667 0.833333V1.66667H13.3333V0.833333C13.3333 0.373333 13.7058 0 14.1667 0C14.6275 0 15 0.373333 15 0.833333V1.66667H15.8333C18.1308 1.66667 20 3.53583 20 5.83333Z",
  suggestion: "M22 14.071L24 12.071V21.854C24.025 23.011 23.002 24.025 21.852 24.003C21.436 24.003 21.021 23.882 20.662 23.643L16.698 20.999H11.001C8.244 20.999 6.001 18.756 6.001 15.999C6.001 15.446 6.449 14.999 7.001 14.999C7.553 14.999 8.001 15.446 8.001 15.999C8.001 17.653 9.347 18.999 11.001 18.999H17.001C17.198 18.999 17.392 19.058 17.556 19.167L21.771 21.978C21.79 21.99 21.843 22.029 21.923 21.985C22.001 21.943 22.001 21.876 22.001 21.854V14.07L22 14.071ZM15.473 6H15.929L17.464 4.465C17.641 4.288 17.838 4.145 18.033 4H15.472C14.928 4 14.484 4.438 14.481 4.981V5.007C14.478 5.555 14.924 5.999 15.472 5.999L15.473 6ZM6.5 13H2.5C1.119 13 0 11.881 0 10.5V6.5C0 2.91 2.91 0 6.5 0C10.09 0 13 2.91 13 6.5C13 10.09 10.09 13 6.5 13ZM5.5 5C5.5 4.704 5.63 4.424 5.858 4.233C6.088 4.039 6.385 3.962 6.69 4.016C7.081 4.085 7.415 4.418 7.484 4.809C7.577 5.341 7.272 5.717 6.982 5.876C6.312 6.245 5.822 6.76 5.769 6.817C5.394 7.22 5.416 7.849 5.817 8.226C6.009 8.407 6.255 8.497 6.501 8.497C6.767 8.497 7.033 8.392 7.23 8.184C7.233 8.181 7.552 7.846 7.948 7.628C9.072 7.008 9.677 5.736 9.454 4.463C9.241 3.252 8.246 2.258 7.036 2.046C6.15 1.89 5.252 2.129 4.572 2.701C3.891 3.273 3.501 4.11 3.501 4.999C3.501 5.551 3.949 5.999 4.501 5.999C5.053 5.999 5.501 5.551 5.501 4.999L5.5 5ZM6.5 11C7.052 11 7.5 10.552 7.5 10C7.5 9.448 7.052 9 6.5 9C5.948 9 5.5 9.448 5.5 10C5.5 10.552 5.948 11 6.5 11ZM12 14.414C12 13.346 12.416 12.341 13.172 11.586L18.879 5.879C20.049 4.709 21.951 4.709 23.121 5.879C24.285 6.996 24.285 9.005 23.121 10.122L17.414 15.829C16.658 16.585 15.654 17.001 14.586 17.001H13C12.448 17.001 12 16.554 12 16.001V14.415V14.414ZM14 15H14.586C15.12 15 15.622 14.792 16 14.414L21.707 8.707C22.095 8.335 22.095 7.665 21.707 7.293C21.316 6.902 20.684 6.903 20.293 7.293L14.586 13C14.208 13.378 14 13.88 14 14.414V15Z",
  checkDouble: "M0.748417 4.48992C0.523833 4.25892 0.529667 3.88967 0.760667 3.66508C0.991667 3.4405 1.3615 3.44575 1.5855 3.67733L3.97075 6.13375C4.14983 6.31458 4.396 6.41667 4.65675 6.41725C4.91633 6.41725 5.16075 6.31633 5.3445 6.13258L10.6692 0.756C10.8955 0.526167 11.2648 0.525 11.494 0.751917C11.7233 0.978833 11.725 1.34808 11.4981 1.57675L6.17167 6.9545C5.76567 7.3605 5.22433 7.58333 4.65267 7.58333C4.07983 7.58217 3.542 7.35758 3.13833 6.95042L0.748417 4.48992ZM13.8285 4.25367C13.6004 4.02558 13.2306 4.02675 13.0037 4.25483L5.36958 11.9082C5.14908 12.1287 4.85392 12.25 4.54242 12.25C4.22975 12.25 3.93633 12.1263 3.71233 11.9006L0.991083 9.20733C0.76125 8.981 0.392583 8.98217 0.165666 9.212C-0.0606669 9.44125 -0.0589169 9.80992 0.16975 10.0368L2.8875 12.726C3.32792 13.1699 3.91475 13.4149 4.54008 13.4167C5.16308 13.4167 5.754 13.174 6.195 12.7324L13.8297 5.0785C14.0572 4.85042 14.0566 4.48117 13.8285 4.25367Z",
  menuDots: "M10 4.16667C11.1506 4.16667 12.0833 3.23393 12.0833 2.08333C12.0833 0.93274 11.1506 -2.98023e-07 10 -2.98023e-07C8.84941 -2.98023e-07 7.91667 0.93274 7.91667 2.08333C7.91667 3.23393 8.84941 4.16667 10 4.16667ZM10 12.0833C11.1506 12.0833 12.0833 11.1506 12.0833 10C12.0833 8.84941 11.1506 7.91667 10 7.91667C8.84941 7.91667 7.91667 8.84941 7.91667 10C7.91667 11.1506 8.84941 12.0833 10 12.0833ZM10 20C11.1506 20 12.0833 19.0673 12.0833 17.9167C12.0833 16.7661 11.1506 15.8333 10 15.8333C8.84941 15.8333 7.91667 16.7661 7.91667 17.9167C7.91667 19.0673 8.84941 20 10 20Z",
  document: "M16.2917 13.4167C16.2917 13.6708 16.1907 13.9146 16.011 14.0943C15.8313 14.274 15.5875 14.375 15.3333 14.375H7.66667C7.4125 14.375 7.16875 14.274 6.98902 14.0943C6.8093 13.9146 6.70833 13.6708 6.70833 13.4167C6.70833 13.1625 6.8093 12.9187 6.98902 12.739C7.16875 12.5593 7.4125 12.4583 7.66667 12.4583H15.3333C15.5875 12.4583 15.8313 12.5593 16.011 12.739C16.1907 12.9187 16.2917 13.1625 16.2917 13.4167ZM12.4583 16.2917H7.66667C7.4125 16.2917 7.16875 16.3926 6.98902 16.5724C6.8093 16.7521 6.70833 16.9958 6.70833 17.25C6.70833 17.5042 6.8093 17.7479 6.98902 17.9276C7.16875 18.1074 7.4125 18.2083 7.66667 18.2083H12.4583C12.7125 18.2083 12.9563 18.1074 13.136 17.9276C13.3157 17.7479 13.4167 17.5042 13.4167 17.25C13.4167 16.9958 13.3157 16.7521 13.136 16.5724C12.9563 16.3926 12.7125 16.2917 12.4583 16.2917ZM21.0833 10.0481V18.2083C21.0818 19.4787 20.5765 20.6966 19.6782 21.5949C18.7799 22.4932 17.562 22.9985 16.2917 23H6.70833C5.43797 22.9985 4.22008 22.4932 3.32179 21.5949C2.42351 20.6966 1.91819 19.4787 1.91667 18.2083V4.79167C1.91819 3.5213 2.42351 2.30341 3.32179 1.40513C4.22008 0.506845 5.43797 0.00152135 6.70833 -3.42726e-07H11.0352C11.9165 -0.00226865 12.7895 0.170188 13.6038 0.507398C14.418 0.844608 15.1573 1.33988 15.779 1.96458L19.1178 5.30533C19.7429 5.92656 20.2384 6.66565 20.5758 7.47977C20.9132 8.29389 21.0857 9.16686 21.0833 10.0481ZM14.4239 3.31967C14.1223 3.02753 13.7836 2.77622 13.4167 2.57217V6.70833C13.4167 6.9625 13.5176 7.20625 13.6974 7.38598C13.8771 7.5657 14.1208 7.66667 14.375 7.66667H18.5112C18.307 7.29981 18.0553 6.96147 17.7627 6.66042L14.4239 3.31967ZM19.1667 10.0481C19.1667 9.89 19.136 9.73858 19.1216 9.58333H14.375C13.6125 9.58333 12.8812 9.28043 12.3421 8.74127C11.8029 8.2021 11.5 7.47083 11.5 6.70833V1.96171C11.3448 1.94733 11.1924 1.91667 11.0352 1.91667H6.70833C5.94584 1.91667 5.21457 2.21957 4.6754 2.75873C4.13623 3.2979 3.83333 4.02917 3.83333 4.79167V18.2083C3.83333 18.9708 4.13623 19.7021 4.6754 20.2413C5.21457 20.7804 5.94584 21.0833 6.70833 21.0833H16.2917C17.0542 21.0833 17.7854 20.7804 18.3246 20.2413C18.8638 19.7021 19.1667 18.9708 19.1667 18.2083V10.0481Z",
  paperPlane: "M19.2657 0.734969C18.9669 0.432575 18.5952 0.212348 18.1865 0.0955657C17.7777 -0.0212167 17.3458 -0.030607 16.9324 0.068302L3.59903 2.87664C2.83117 2.98194 2.10797 3.29953 1.51086 3.79365C0.913753 4.28776 0.466454 4.93877 0.219339 5.67336C-0.0277757 6.40795 -0.0648919 7.19694 0.11217 7.95148C0.289233 8.70603 0.673441 9.39615 1.22153 9.94414L2.65319 11.375C2.73068 11.4524 2.79213 11.5444 2.83403 11.6457C2.87593 11.7469 2.89745 11.8554 2.89736 11.965V14.605C2.8992 14.9762 2.98465 15.3422 3.14736 15.6758L3.14069 15.6816L3.16236 15.7033C3.40654 16.1942 3.80535 16.5913 4.29736 16.8333L4.31903 16.855L4.32486 16.8483C4.65849 17.011 5.0245 17.0965 5.39569 17.0983H8.03569C8.25657 17.0981 8.46848 17.1856 8.62486 17.3416L10.0557 18.7725C10.4395 19.1605 10.8962 19.4687 11.3997 19.6794C11.9031 19.8901 12.4433 19.999 12.989 20C13.4438 19.9994 13.8955 19.9251 14.3265 19.78C15.0544 19.541 15.701 19.1033 16.1934 18.5164C16.6858 17.9295 17.0044 17.2166 17.1132 16.4583L19.9257 3.0958C20.0297 2.67884 20.0236 2.24199 19.9079 1.8281C19.7922 1.41422 19.5709 1.03753 19.2657 0.734969ZM3.83319 10.1983L2.40069 8.76747C2.06713 8.44194 1.83334 8.02801 1.72677 7.57427C1.62019 7.12052 1.64526 6.6458 1.79903 6.2058C1.94811 5.7544 2.2237 5.35532 2.59302 5.05602C2.96235 4.75672 3.40987 4.56979 3.88236 4.51747L17.0832 1.7383L4.56236 14.2608V11.965C4.56362 11.6369 4.49983 11.3119 4.37467 11.0086C4.24951 10.7054 4.06547 10.43 3.83319 10.1983ZM15.4757 16.1733C15.4117 16.6336 15.2207 17.0669 14.9241 17.4247C14.6275 17.7824 14.2371 18.0504 13.7966 18.1986C13.3562 18.3468 12.8832 18.3692 12.4306 18.2635C11.9781 18.1578 11.564 17.928 11.2349 17.6L9.80153 16.1666C9.57017 15.934 9.29498 15.7496 8.99188 15.624C8.68878 15.4984 8.36378 15.4341 8.03569 15.435H5.73986L18.2624 2.91664L15.4757 16.1733Z",
  clipFile: "M22 5V19C22 21.757 19.757 24 17 24H7C4.243 24 2 21.757 2 19V5C2 2.243 4.243 0 7 0H8C8.552 0 9 0.448 9 1C9 1.552 8.552 2 8 2H7C5.346 2 4 3.346 4 5V19C4 20.654 5.346 22 7 22H17C18.654 22 20 20.654 20 19V5C20 4.311 19.772 3.662 19.342 3.125C18.997 2.694 19.066 2.065 19.497 1.719C19.927 1.373 20.556 1.441 20.903 1.874C21.611 2.756 22 3.868 22 5ZM8 19H16C16.552 19 17 18.552 17 18C17 17.448 16.552 17 16 17H8C7.448 17 7 17.448 7 18C7 18.552 7.448 19 8 19ZM11 11C11.552 11 12 10.552 12 10V4C12 2.897 12.897 2 14 2C15.103 2 16 2.897 16 4V11.5C16 11.776 15.776 12 15.5 12C15.224 12 15 11.776 15 11.5V5C15 4.448 14.552 4 14 4C13.448 4 13 4.448 13 5V11.5C13 12.878 14.122 14 15.5 14C16.878 14 18 12.878 18 11.5V4C18 1.794 16.206 0 14 0C11.794 0 10 1.794 10 4V10C10 10.552 10.448 11 11 11ZM8 15H10.5C11.052 15 11.5 14.552 11.5 14C11.5 13.448 11.052 13 10.5 13H8C7.448 13 7 13.448 7 14C7 14.552 7.448 15 8 15Z",
  mailPlus: "M16 9.33333V12.6667C16 14.5047 14.5047 16 12.6667 16H3.33333C1.49533 16 0 14.5047 0 12.6667V5.33333C0 3.49533 1.49533 2 3.33333 2H6C6.36867 2 6.66667 2.29867 6.66667 2.66667C6.66667 3.03467 6.36867 3.33333 6 3.33333H3.33333C2.568 3.33333 1.91 3.77 1.574 4.40267L6.586 9.414C7.34133 10.1693 8.65867 10.1693 9.414 9.414L9.634 9.19467C9.89533 8.93467 10.3167 8.934 10.5767 9.196C10.8367 9.45667 10.836 9.87867 10.5753 10.1387L10.356 10.3573C9.728 10.986 8.89067 11.3333 8 11.3333C7.10933 11.3333 6.272 10.986 5.64333 10.3567L1.33333 6.04733V12.6667C1.33333 13.7693 2.23067 14.6667 3.33333 14.6667H12.6667C13.7693 14.6667 14.6667 13.7693 14.6667 12.6667V9.33333C14.6667 8.96467 14.9647 8.66667 15.3333 8.66667C15.702 8.66667 16 8.96467 16 9.33333ZM8 4C8 1.794 9.794 0 12 0C14.206 0 16 1.794 16 4C16 6.206 14.206 8 12 8C9.794 8 8 6.206 8 4ZM9.33333 4C9.33333 5.47067 10.5293 6.66667 12 6.66667C13.4707 6.66667 14.6667 5.47067 14.6667 4C14.6667 2.52933 13.4707 1.33333 12 1.33333C10.5293 1.33333 9.33333 2.52933 9.33333 4ZM10.6667 4.66667H11.3333V5.33333C11.3333 5.70133 11.6313 6 12 6C12.3687 6 12.6667 5.70133 12.6667 5.33333V4.66667H13.3333C13.702 4.66667 14 4.368 14 4C14 3.632 13.702 3.33333 13.3333 3.33333H12.6667V2.66667C12.6667 2.29867 12.3687 2 12 2C11.6313 2 11.3333 2.29867 11.3333 2.66667V3.33333H10.6667C10.298 3.33333 10 3.632 10 4C10 4.368 10.298 4.66667 10.6667 4.66667Z",
};

const ToggleSwitch = ({ active, onToggle }) => (
  <div 
    onClick={onToggle}
    className="relative shrink-0 cursor-pointer transition-all duration-300" 
    style={{ width: '2.5vw', height: '1.5vw' }}
  >
    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 28">
      <rect fill={active ? '#01CBB1' : '#1E1E24'} height="27" rx="13.5" width="47" x="0.5" y="0.5" />
      <rect height="27" rx="13.5" stroke="#2A2A30" width="47" x="0.5" y="0.5" />
      <circle 
        cx={active ? "34" : "14"} 
        cy="14" 
        fill="white" 
        r="10" 
        className="transition-all duration-300"
      />
    </svg>
  </div>
);

const ChatItem = ({ name, message, time, active, unread, onClick }) => (
  <div onClick={onClick} className={`flex flex-col w-full cursor-pointer transition-all duration-200 ${active ? 'bg-[#1e1e24]' : 'hover:bg-[#1e1e24]/50'}`} 
       style={{ borderRadius: '0.8vw', padding: '1vh 0.8vw', marginBottom: '1vh' }}>
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center" style={{ gap: '0.8vw' }}>
         <div className="bg-[#2A2A30] flex items-center justify-center rounded-full" style={{ width: '2vw', height: '2vw' }}>
            <svg viewBox="0 0 24 24" fill="white" style={{ width: '1.2vw', height: '1.2vw' }}>
              <path d={svgPaths.suggestion} />
            </svg>
         </div>
         <div className="flex flex-col">
            <span className="text-white font-medium" style={{ fontSize: '0.85vw' }}>{name}</span>
            <span className="text-[#a5a5b2] truncate w-[12vw]" style={{ fontSize: '0.75vw' }}>{message}</span>
         </div>
      </div>
      <div className="flex flex-col items-end justify-center" style={{ gap: '8px', minWidth: '3vw' }}>
        <span className="text-[#9a9a9a] whitespace-nowrap" style={{ fontSize: '0.7vw' }}>{time}</span>
        <div className="flex justify-end w-full" style={{ height: '1.2vh' }}>
            {unread ? (
              <div className="bg-[#3457dc] shadow-[0_0_10px_rgba(52,87,220,0.5)]" 
                   style={{ width: '0.6vw', height: '0.6vw', borderRadius: '50%' }} />
            ) : (
                <svg width="0.8vw" height="0.8vw" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.748411 3.90725C0.523827 3.67625 0.529661 3.307 0.760661 3.08241C0.991661 2.85783 1.36149 2.86308 1.58549 3.09466L3.97074 5.55108C4.14983 5.73191 4.39599 5.834 4.65674 5.83458C4.91633 5.83458 5.16074 5.73366 5.34449 5.54991L10.6692 0.173329C10.8955 -0.0565048 11.2647 -0.0576714 11.494 0.169245C11.7232 0.396162 11.725 0.765412 11.4981 0.994079L6.17166 6.37183C5.76566 6.77783 5.22433 7.00066 4.65266 7.00066C4.07983 6.9995 3.54199 6.77491 3.13833 6.36775L0.748411 3.90725ZM13.8285 3.671C13.6004 3.44291 13.2306 3.44408 13.0037 3.67216L5.36958 11.3255C5.14908 11.546 4.85391 11.6673 4.54241 11.6673C4.22974 11.6673 3.93633 11.5437 3.71233 11.3179L0.991077 8.62466C0.761244 8.39833 0.392577 8.3995 0.165661 8.62933C-0.0606727 8.85858 -0.0589227 9.22725 0.169744 9.45416L2.88749 12.1433C3.32791 12.5872 3.91474 12.8322 4.54008 12.834C5.16308 12.834 5.75399 12.5913 6.19499 12.1497L13.8297 4.49583C14.0572 4.26775 14.0566 3.8985 13.8285 3.671Z" fill="#01CBB1"/>
                </svg>
            )}
        </div>
      </div>
    </div>
  </div>
);

const TeamContact = () => {
    const [unreadOnly, setUnreadOnly] = useState(false);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [chats, setChats] = useState([]);
    const [conversations, setConversations] = useState({});
    const [isLoadingChats, setIsLoadingChats] = useState(true);
    const [isLoadingMsgs, setIsLoadingMsgs] = useState(false);
    const messagesEndRef = useRef(null);

    const fetchChats = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:5000/api/messages/list', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setChats(data);
                if (data.length > 0 && !selectedChatId) {
                    setSelectedChatId(data[0].id);
                }
            }
        } catch (err) { console.error(err); }
        finally { setIsLoadingChats(false); }
    };

    const fetchConversation = async (otherId) => {
        if (!otherId) return;
        setIsLoadingMsgs(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:5000/api/messages/conversation/${otherId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setConversations(prev => ({ ...prev, [otherId]: data }));
            }
        } catch (err) { console.error(err); }
        finally { setIsLoadingMsgs(false); }
    };

    useEffect(() => {
        fetchChats();
    }, []);

    useEffect(() => {
        if (selectedChatId) {
            fetchConversation(selectedChatId);
        }
    }, [selectedChatId]);

    const scrollToBottom = (instant = false) => {
      messagesEndRef.current?.scrollIntoView({ behavior: instant ? "auto" : "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [conversations, selectedChatId]);

    const fileInputRef = useRef(null);

    const handleSendMessage = async (file = null) => {
      if (!newMessage.trim() && !file) return;
      if (!selectedChatId) return;

      try {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('recipient', selectedChatId);
        
        if (file) {
            formData.append('file', file);
            formData.append('type', 'doc');
            formData.append('fileName', file.name);
            formData.append('fileSize', (file.size / 1024 / 1024).toFixed(2) + ' mo');
        } else {
            formData.append('text', newMessage);
            formData.append('type', 'text');
        }

        const res = await fetch('http://localhost:5000/api/messages/send', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        });

        if (res.ok) {
            setNewMessage('');
            fetchConversation(selectedChatId);
            fetchChats();
        }
      } catch (err) { console.error(err); }
    };

    const handleFileSelect = (e) => {
      const file = e.target.files[0];
      if (file) {
        handleSendMessage(file);
      }
    };

    const handleCreateNewChat = async (data) => {
      const { recipientId, message, file } = data; // NewChatModal should return recipientId
      
      try {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('recipient', recipientId);
        if (message) formData.append('text', message);
        formData.append('type', file ? 'doc' : 'text');
        if (file) {
            formData.append('file', file);
            formData.append('fileName', file.name);
            formData.append('fileSize', (file.size / 1024 / 1024).toFixed(2) + ' mo');
        }

        const res = await fetch('http://localhost:5000/api/messages/send', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        });

        if (res.ok) {
            const newMsg = await res.json();
            setIsModalOpen(false);
            fetchChats();
            setSelectedChatId(recipientId);
        }
      } catch (err) { console.error(err); }
    };

    const activeChat = chats.find(c => c.id === selectedChatId);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredChats = chats
      .filter(c => !unreadOnly || c.unread)
      .filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
      <div className="w-full text-white font-poppins animate-in fade-in duration-500 flex flex-col h-[calc(100vh-11.4vh-80px)]" style={{ gap: '3vh' }}>
        {/* Header Bar */}
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center" style={{ gap: '0.8vw' }}>
              <h1 className="font-bold text-white m-0" style={{ fontSize: '1.2vw', fontFamily: 'Gilroy, Poppins, sans-serif' }}>Your Team chats</h1>
              <div className="bg-accent flex items-center justify-center text-white font-bold" 
                   style={{ width: '1.4vw', height: '1.4vw', borderRadius: '50%', fontSize: '0.8vw' }}>
                3
              </div>
           </div>
           
           <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#3457dc] flex items-center justify-center text-white transition-all hover:bg-[#4a6dec]"
              style={{ gap: '0.6vw', padding: '1.2vh 1.8vw', borderRadius: '1vw' }}
           >
              <span style={{ fontSize: '0.85vw' }}>New Chat</span>
              <svg viewBox="0 0 16 16" fill="white" style={{ width: '1vw', height: '1vw' }}>
                 <path d={svgPaths.mailPlus} />
              </svg>
           </button>
        </div>

        <div className="flex flex-1" style={{ gap: '2vw', minHeight: 0 }}>
           {/* Sidebar Panel */}
           <div className="bg-[#151519] flex flex-col h-full border border-white/5" 
                style={{ width: '26vw', borderRadius: '1vw', padding: '2vh 1.5vw', gap: '2.5vh' }}>
              
              <div className="bg-[#1e1e24] flex items-center justify-between border border-transparent focus-within:border-[#3457dc] transition-all"
                   style={{ borderRadius: '0.8vw', padding: '1vh 1vw', width: '100%' }}>
                <input 
                    type="text" 
                    placeholder="Search /" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-transparent border-none outline-none text-white placeholder-[#9a9a9a]"
                    style={{ fontSize: '0.85vw', width: '100%' }}
                />
                <svg viewBox="0 0 20 20" style={{ width: '1.2vw', height: '1.2vw' }} fill="none" stroke="#3457DC" strokeWidth="1.5">
                   <path d={svgPaths.searchNormal} />
                   <path d={svgPaths.searchNormal2} />
                </svg>
              </div>

              <div className="flex flex-col" style={{ gap: '1.5vh' }}>
                 <div className="flex items-center justify-between w-full">
                    <div className="flex items-center" style={{ gap: '1vw' }}>
                       <svg viewBox="0 0 20 20" fill="white" style={{ width: '1.1vw', height: '1.1vw' }}>
                          <path d={svgPaths.barsSort} />
                       </svg>
                       <svg viewBox="0 0 20 20" fill="white" style={{ width: '1.1vw', height: '1.1vw' }}>
                          <path d={svgPaths.filterList} />
                       </svg>
                       <svg viewBox="0 0 20 20" fill="white" style={{ width: '1.1vw', height: '1.1vw' }}>
                          <path d={svgPaths.calendarClock} />
                       </svg>
                       <div className="bg-[#1e1e24] rounded-[0.4vw] flex items-center justify-center" 
                            style={{ padding: '0.4vh 0.6vw', fontSize: '0.8vw' }}>0</div>
                    </div>
                    <div className="flex items-center" style={{ gap: '0.6vw' }}>
                       <span style={{ fontSize: '0.8vw' }}>Unread only</span>
                       <ToggleSwitch active={unreadOnly} onToggle={() => setUnreadOnly(!unreadOnly)} />
                    </div>
                 </div>
                 <div style={{ height: '0.1vh', backgroundColor: '#1E1D22', width: '100%' }} />
              </div>

                  <div className="flex-1 overflow-y-auto pr-[0.4vw] custom-scrollbar">
                     {filteredChats.map(chat => (
                       <ChatItem 
                          key={chat.id}
                          name={chat.name?.split('@')[0] || chat.name}
                          message={chat.lastMessage}
                          time={new Date(chat.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                          active={selectedChatId === chat.id}
                          unread={chat.unread}
                          onClick={() => {
                            setSelectedChatId(chat.id);
                            setChats(prev => prev.map(c => c.id === chat.id ? { ...c, unread: false } : c));
                          }}
                       />
                     ))}
                 {filteredChats.length === 0 && (
                   <div className="text-center text-[#a5a5b2] py-[4vh]" style={{ fontSize: '0.8vw' }}>
                      No chats found.
                   </div>
                 )}
              </div>
           </div>

           {/* Conversation Area */}
           <div className="bg-[#151519] flex-1 flex flex-col h-full border border-white/5 relative" 
                style={{ borderRadius: '1vw', padding: '2.5vh 2vw', gap: '3vh' }}>
              
              <div className="flex items-center justify-between w-full">
                 <div className="flex flex-col" style={{ gap: '0.4vh' }}>
                    <h2 className="font-bold text-white m-0" style={{ fontSize: '1vw', fontFamily: 'Gilroy, Poppins, sans-serif' }}>
                      {activeChat?.name?.split('@')[0] || activeChat?.name}
                    </h2>
                    <div className="flex items-center" style={{ gap: '0.6vw' }}>
                       <div style={{ width: '0.2vh', height: '1.5vh', backgroundColor: '#3457DC' }} />
                       <span className="text-[#a5a5b2]" style={{ fontSize: '0.75vw' }}>{activeChat?.role}</span>
                    </div>
                 </div>
                 <svg viewBox="0 0 20 20" fill="#3457DC" className="cursor-pointer" style={{ width: '1.2vw', height: '1.2vw' }}>
                    <path d={svgPaths.menuDots} />
                 </svg>
              </div>

              <div style={{ height: '0.1vh', backgroundColor: '#1E1D22', width: '100%' }} />

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto pr-[0.5vw] custom-scrollbar" style={{ gap: '4vh', display: 'flex', flexDirection: 'column' }}>
                 <div className="text-center text-[#a5a5b2] mb-[2vh]" style={{ fontSize: '0.7vw' }}>Conversation history with {activeChat?.name?.split('@')[0] || activeChat?.name}</div>
                 
                 {(conversations[selectedChatId] || []).map((msg, idx) => (
                    <div key={msg.id} className={`flex flex-col w-full ${msg.self ? 'items-end' : 'items-start'}`} style={{ gap: '1vh', marginBottom: '2vh' }}>
                       
                       {msg.type === 'doc' ? (
                          <div className="bg-[#222127] flex items-center cursor-pointer hover:bg-[#2A2A30] transition-colors" 
                               style={{ gap: '0.8vw', padding: '1.2vh 1.2vw', borderRadius: '0.8vw', maxWidth: '22vw' }}>
                             <svg viewBox="0 0 23 23" fill="white" style={{ width: '1.4vw', height: '1.4vw' }}>
                                <path d={svgPaths.document} />
                             </svg>
                             <div className="flex flex-col">
                                <span className="text-[0.8vw] truncate">{msg.text}</span>
                                <span className="text-[#a5a5b2] text-[0.7vw]">{msg.subtext}</span>
                             </div>
                          </div>
                       ) : (
                          <div className={`${msg.self ? 'bg-[#3457dc]' : 'bg-[#222127]'}`} 
                               style={{ padding: '1.5vh 1.5vw', borderRadius: '0.8vw', width: 'Fit-content', maxWidth: '22vw' }}>
                             <p className="m-0 leading-relaxed font-poppins" style={{ fontSize: '0.85vw' }}>
                                {msg.text}
                             </p>
                          </div>
                       )}
                       <div className="flex justify-between w-[22vw]" style={{ fontSize: '0.7vw', color: '#9a9a9a' }}>
                          <span className="font-medium">{msg.self ? 'You' : (activeChat?.name?.split('@')[0] || 'Member')}</span>
                          <span>{msg.time}</span>
                       </div>
                    </div>
                 ))}
                 <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="flex flex-col" style={{ gap: '2vh' }}>
                 <div style={{ height: '0.1vh', backgroundColor: '#1E1D22', width: '100%' }} />
                  <div className="flex items-center" style={{ gap: '1vw' }}>
                    <input 
                      type="file" 
                      className="hidden" 
                      ref={fileInputRef} 
                      onChange={handleFileSelect} 
                    />
                    <div className="bg-[#1e1e24] flex-1 flex items-center border border-transparent focus-within:border-[#3457dc] transition-all"
                         style={{ borderRadius: '0.8vw', padding: '1.2vh 1.2vw' }}>
                       <input 
                           type="text" 
                           value={newMessage}
                           onChange={(e) => setNewMessage(e.target.value)}
                           onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                           placeholder="Aa .." 
                           className="bg-transparent border-none outline-none text-white placeholder-[#a5a5b2] w-full"
                           style={{ fontSize: '0.85vw' }}
                       />
                    </div>
                    <button 
                        onClick={() => handleSendMessage()}
                        className="bg-[#3457dc] flex items-center justify-center rounded-[0.5vw] hover:bg-[#4a6dec] transition-all"
                        style={{ padding: '1.2vh 1.2vw' }}
                    >
                       <svg viewBox="0 0 20 20" fill="white" style={{ width: '1.2vw', height: '1.2vw' }}>
                          <path d={svgPaths.paperPlane} />
                       </svg>
                    </button>
                    <div className="flex items-center" style={{ borderLeft: '1px solid #2A2A30', paddingLeft: '1vw' }}>
                       <div className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => fileInputRef.current?.click()}>
                          <svg viewBox="0 0 24 24" fill="#3457DC" style={{ width: '1.4vw', height: '1.4vw' }}>
                             <path d={svgPaths.clipFile} />
                          </svg>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* New Chat Modal */}
        <NewChatModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSend={handleCreateNewChat}
        />
      </div>
    );
};

export default TeamContact;

/* Generate Test Data for atciqn */

#include <stdio.h>
#include "sofa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  double t1;
  double t2;
  double t3;
  double t4;
  double t5;
  iauASTROM t6;
  int ti6;;
  int t7;
  int ti8;;
  iauLDBODY t8[100];;
  unsigned long long modulo = 0;
  printf("var atciqn_results = [\n");
  for (t0 = -28; t0 <= 28; t0 += 21) {
    for (t1 = -28; t1 <= 28; t1 += 21) {
      for (t2 = -28; t2 <= 28; t2 += 21) {
        for (t3 = -28; t3 <= 28; t3 += 21) {
          for (t4 = -28; t4 <= 28; t4 += 21) {
            for (t5 = -28; t5 <= 28; t5 += 21) {
              for (ti6 = 0; ti6 <= 3; ti6 += 1) {
                for (t7 = 0; t7 <= 2; t7 += 1) {
                  for (ti8 = 0; ti8 <= 1; ti8 += 1) {

                    double res0 = {0};
                    double res1 = {0};
                    modulo = modulo > 2218
                      ? 0 : modulo + 1;
                    if (modulo != 1) continue;
                    t8[3] = lbodys[0];
                    t8[2] = lbodys[1];
                    t8[1] = lbodys[2];
                    t8[0] = lbodys[t7];
                t6 = astroms[ti6];
                    printf("  [");
                    printf("%.28e", t0);
                    printf(", ");
                    printf("%.28e", t1);
                    printf(", ");
                    printf("%.28e", t2);
                    printf(", ");
                    printf("%.28e", t3);
                    printf(", ");
                    printf("%.28e", t4);
                    printf(", ");
                    printf("%.28e", t5);
                    printf(", ");
                    exportASTROM(t6);
                    printf(", ");
                    printf("%d", t7);
                    printf(", ");
                    exportLDBODY(t7, t8);
                    printf(", ");
                    iauAtciqn(t0, t1, t2, t3, t4, t5, &t6, t7, t8, &res0, &res1);
                    printf("%.28e", res0);
                    printf(", ");
                    printf("%.28e", res1);
                    printf("  ],\n");

                  }
                }
              }
            }
          }
        }
      }
    }
  }

  printf("];\n");
}

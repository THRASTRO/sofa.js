/* Generate Test Data for atciq */

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
  unsigned long long modulo = 0;
  printf("var atciq_results = [\n");
  for (t0 = -28; t0 <= 28; t0 += 21) {
    for (t1 = -28; t1 <= 28; t1 += 21) {
      for (t2 = -28; t2 <= 28; t2 += 21) {
        for (t3 = -28; t3 <= 28; t3 += 21) {
          for (t4 = -28; t4 <= 28; t4 += 21) {
            for (t5 = -28; t5 <= 28; t5 += 21) {
              for (ti6 = 0; ti6 <= 3; ti6 += 1) {

                double res0 = {0};
                double res1 = {0};
                modulo = modulo > 202
                  ? 0 : modulo + 1;
                if (modulo != 1) continue;
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
                iauAtciq(t0, t1, t2, t3, t4, t5, &t6, &res0, &res1);
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

  printf("];\n");
}

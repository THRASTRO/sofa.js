/* Generate Test Data for apci */

#include <stdio.h>
#include "erfa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  double t1;
  double t2[2][3];
  double t3[3];
  double t4;
  double t5;
  double t6;
  unsigned long long modulo = 0;
  printf("var apci_results = [\n");
  for (t0 = 1955545; t0 <= 2947545; t0 += 124000) {
    for (t1 = 1955545; t1 <= 2947545; t1 += 124000) {
      for (t2[0][0] = - 1.73333 * 0.0 - 1; t2[0][0] <= + 1.73333 * 1.0 - 1; t2[0][0] += 1.73333) {
      for (t2[1][0] = - 1.73333 * 0.0 - 1; t2[1][0] <= + 1.73333 * 1.0 - 1; t2[1][0] += 1.73333) {
      for (t2[0][1] = - 1.73333 * 0.0 - 1; t2[0][1] <= + 1.73333 * 1.0 - 1; t2[0][1] += 1.73333) {
      for (t2[1][1] = - 1.73333 * 0.0 - 1; t2[1][1] <= + 1.73333 * 1.0 - 1; t2[1][1] += 1.73333) {
      for (t2[0][2] = - 1.73333 * 0.0 - 1; t2[0][2] <= + 1.73333 * 1.0 - 1; t2[0][2] += 1.73333) {
      for (t2[1][2] = - 1.73333 * 0.0 - 1; t2[1][2] <= + 1.73333 * 1.0 - 1; t2[1][2] += 1.73333) {
        long mod3 = 0;
        for (t3[0] = -0.04124432; t3[0] <= 0.04124432; t3[0] += 0.03093324) {
        for (t3[1] = -0.04124432; t3[1] <= 0.04124432; t3[1] += 0.03093324) {
        for (t3[2] = -0.04124432; t3[2] <= 0.04124432; t3[2] += 0.03093324) {
          mod3 ++;
          if (mod3 > 1728) mod3 = 0;
          if (mod3 != 1) continue;
          for (t4 = -28; t4 <= 28; t4 += 21) {
            for (t5 = -28; t5 <= 28; t5 += 21) {
              for (t6 = -28; t6 <= 28; t6 += 21) {

                eraASTROM res0 = {0};
                modulo = modulo > 30131
                  ? 0 : modulo + 1;
                if (modulo != 1) continue;
                printf("  [");
                printf("%.28e", t0);
                printf(", ");
                printf("%.28e", t1);
                printf(", ");
                exportPV3(t2);
                printf(", ");
                exportV3(t3);
                printf(", ");
                printf("%.28e", t4);
                printf(", ");
                printf("%.28e", t5);
                printf(", ");
                printf("%.28e", t6);
                printf(", ");
                eraApci(t0, t1, t2, t3, t4, t5, t6, &res0);
                exportASTROM(res0);
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
      }
      }
      }
    }
  }

  printf("];\n");
}

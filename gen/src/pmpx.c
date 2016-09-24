/* Generate Test Data for pmpx */

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
  double t6;
  double t7[3];
  unsigned long long modulo = 0;
  printf("var pmpx_results = [\n");
  for (t0 = -28; t0 <= 28; t0 += 21) {
    for (t1 = -28; t1 <= 28; t1 += 21) {
      for (t2 = -28; t2 <= 28; t2 += 21) {
        for (t3 = -28; t3 <= 28; t3 += 21) {
          for (t4 = -28; t4 <= 28; t4 += 21) {
            for (t5 = -28; t5 <= 28; t5 += 21) {
              for (t6 = -28; t6 <= 28; t6 += 21) {
                for (t7[0] = -0.04124432; t7[0] <= 0.04124432; t7[0] += 0.03093324) {
                for (t7[1] = -0.04124432; t7[1] <= 0.04124432; t7[1] += 0.03093324) {
                for (t7[2] = -0.04124432; t7[2] <= 0.04124432; t7[2] += 0.03093324) {

                  double res0[3] = {0};
                  modulo = modulo > 30131
                    ? 0 : modulo + 1;
                  if (modulo != 1) continue;
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
                  printf("%.28e", t6);
                  printf(", ");
                  exportV3(t7);
                  printf(", ");
                  iauPmpx(t0, t1, t2, t3, t4, t5, t6, t7, res0);
                  exportV3(res0);
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

  printf("];\n");
}

/* Generate Test Data for pn06 */

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
  unsigned long long modulo = 0;
  printf("var pn06_results = [\n");
  for (t0 = 1955545; t0 <= 2947545; t0 += 124000) {
    for (t1 = 1955545; t1 <= 2947545; t1 += 124000) {
      for (t2 = -12; t2 <= 12; t2 += 3.75) {
        for (t3 = -28; t3 <= 28; t3 += 28) {

          double res0 = {0};
          double res1[3][3] = {0};
          double res2[3][3] = {0};
          double res3[3][3] = {0};
          double res4[3][3] = {0};
          double res5[3][3] = {0};
          modulo = modulo > 60
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
          iauPn06(t0, t1, t2, t3, &res0, res1, res2, res3, res4, res5);
          printf("%.28e", res0);
          printf(", ");
          exportMAT33(res1);
          printf(", ");
          exportMAT33(res2);
          printf(", ");
          exportMAT33(res3);
          printf(", ");
          exportMAT33(res4);
          printf(", ");
          exportMAT33(res5);
          printf("  ],\n");

        }
      }
    }
  }

  printf("];\n");
}

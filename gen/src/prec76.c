/* Generate Test Data for prec76 */

#include <stdio.h>
#include "erfa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  double t1;
  double t2;
  double t3;
  unsigned long long modulo = 0;
  printf("var prec76_results = [\n");
  for (t0 = 1955545; t0 <= 2947545; t0 += 124000) {
    for (t1 = 1955545; t1 <= 2947545; t1 += 124000) {
      for (t2 = 1955545; t2 <= 2947545; t2 += 124000) {
        for (t3 = 1955545; t3 <= 2947545; t3 += 124000) {

          double res0 = {0};
          double res1 = {0};
          double res2 = {0};
          modulo = modulo > 4
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
          eraPrec76(t0, t1, t2, t3, &res0, &res1, &res2);
          printf("%.28e", res0);
          printf(", ");
          printf("%.28e", res1);
          printf(", ");
          printf("%.28e", res2);
          printf("  ],\n");

        }
      }
    }
  }

  printf("];\n");
}

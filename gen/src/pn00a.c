/* Generate Test Data for pn00a */

#include <stdio.h>
#include "erfa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  double t1;
  unsigned long long modulo = 0;
  printf("var pn00a_results = [\n");
  for (t0 = 1955545; t0 <= 2947545; t0 += 124000) {
    for (t1 = 1955545; t1 <= 2947545; t1 += 124000) {

      double res0 = {0};
      double res1 = {0};
      double res2 = {0};
      double res3[3][3] = {0};
      double res4[3][3] = {0};
      double res5[3][3] = {0};
      double res6[3][3] = {0};
      double res7[3][3] = {0};
      modulo = modulo > 5
        ? 0 : modulo + 1;
      if (modulo != 1) continue;
      printf("  [");
      printf("%.28e", t0);
      printf(", ");
      printf("%.28e", t1);
      printf(", ");
      eraPn00a(t0, t1, &res0, &res1, &res2, res3, res4, res5, res6, res7);
      printf("%.28e", res0);
      printf(", ");
      printf("%.28e", res1);
      printf(", ");
      printf("%.28e", res2);
      printf(", ");
      exportMAT33(res3);
      printf(", ");
      exportMAT33(res4);
      printf(", ");
      exportMAT33(res5);
      printf(", ");
      exportMAT33(res6);
      printf(", ");
      exportMAT33(res7);
      printf("  ],\n");

    }
  }

  printf("];\n");
}

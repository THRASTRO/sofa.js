/* Generate Test Data for epv00 */

#include <stdio.h>
#include "erfa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  double t1;
  printf("var epv00_results = [\n");
  for (t0 = 1955545; t0 <= 2947545; t0 += 124000) {
    for (t1 = 1955545; t1 <= 2947545; t1 += 124000) {

      double res0[2][3] = {0};
      double res1[2][3] = {0};
      printf("  [");
      printf("%.28e", t0);
      printf(", ");
      printf("%.28e", t1);
      printf(", ");
      printf("%d", eraEpv00(t0, t1, res0, res1));
      printf(", ");
      exportPV3(res0);
      printf(", ");
      exportPV3(res1);
      printf("  ],\n");

    }
  }

  printf("];\n");
}

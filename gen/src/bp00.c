/* Generate Test Data for bp00 */

#include <stdio.h>
#include "sofa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  double t1;
  printf("var bp00_results = [\n");
  for (t0 = 1955545; t0 <= 2947545; t0 += 124000) {
    for (t1 = 1955545; t1 <= 2947545; t1 += 124000) {

      double res0[3][3] = {0};
      double res1[3][3] = {0};
      double res2[3][3] = {0};
      printf("  [");
      printf("%.28e", t0);
      printf(", ");
      printf("%.28e", t1);
      printf(", ");
      iauBp00(t0, t1, res0, res1, res2);
      exportMAT33(res0);
      printf(", ");
      exportMAT33(res1);
      printf(", ");
      exportMAT33(res2);
      printf("  ],\n");

    }
  }

  printf("];\n");
}

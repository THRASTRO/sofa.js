/* Generate Test Data for aper13 */

#include <stdio.h>
#include "erfa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  double t1;
  printf("var aper13_results = [\n");
  for (t0 = -12; t0 <= 12; t0 += 3.75) {
    for (t1 = -12; t1 <= 12; t1 += 3.75) {

      eraASTROM res0 = {0};
      printf("  [");
      printf("%.28e", t0);
      printf(", ");
      printf("%.28e", t1);
      printf(", ");
      eraAper13(t0, t1, &res0);
      exportASTROM(res0);
      printf("  ],\n");

    }
  }

  printf("];\n");
}

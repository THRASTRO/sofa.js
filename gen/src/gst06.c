/* Generate Test Data for gst06 */

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
  double t4[3][3];
  double _t4[3][3];
  unsigned long long modulo = 0;
  printf("var gst06_results = [\n");
  for (t0 = -12; t0 <= 12; t0 += 3.75) {
    for (t1 = -12; t1 <= 12; t1 += 3.75) {
      for (t2 = -12; t2 <= 12; t2 += 3.75) {
        for (t3 = -12; t3 <= 12; t3 += 3.75) {
          long mod4 = 0;
          for (_t4[0][0] = 0; _t4[0][0] <= 1; _t4[0][0] += 1) {
          for (_t4[0][1] = 0; _t4[0][1] <= 1; _t4[0][1] += 1) {
          for (_t4[0][2] = 0; _t4[0][2] <= 1; _t4[0][2] += 1) {
          for (_t4[1][0] = 0; _t4[1][0] <= 1; _t4[1][0] += 1) {
          for (_t4[1][1] = 0; _t4[1][1] <= 1; _t4[1][1] += 1) {
          for (_t4[1][2] = 0; _t4[1][2] <= 1; _t4[1][2] += 1) {
          for (_t4[2][0] = 0; _t4[2][0] <= 1; _t4[2][0] += 1) {
          for (_t4[2][1] = 0; _t4[2][1] <= 1; _t4[2][1] += 1) {
          for (_t4[2][2] = 0; _t4[2][2] <= 1; _t4[2][2] += 1) {
            mod4 ++;
            if (mod4 > 1728) mod4 = 0;
            if (mod4 != 1) continue;


            modulo = modulo > 2218
              ? 0 : modulo + 1;
            if (modulo != 1) continue;
            memcpy(&t4, &_t4, sizeof t4);
            printf("  [");
            printf("%.28e", t0);
            printf(", ");
            printf("%.28e", t1);
            printf(", ");
            printf("%.28e", t2);
            printf(", ");
            printf("%.28e", t3);
            printf(", ");
            exportMAT33(t4);
            printf(", ");
            printf("%.28e", iauGst06(t0, t1, t2, t3, t4));
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

  printf("];\n");
}
